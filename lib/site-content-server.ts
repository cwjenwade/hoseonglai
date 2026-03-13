import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { unstable_noStore as noStore } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export type SiteContentSection =
  | "brand_philosophy_page"
  | "brand_philosophy_team"
  | "heartfelt_momentum_videos"
  | "fortune_arrives_lectures"
  | "togetherness_groups"
  | "collaborative_prosperity_projects";

const CONTENT_FILE_PATH = path.join(process.cwd(), "data", "site-content.json");
const CONTENT_BUCKET = process.env.SITE_CONTENT_BUCKET || "site-content";
const CONTENT_JSON_PATH = "site-content.json";

let bucketEnsured = false;

type ContentStore = Partial<Record<SiteContentSection, unknown>>;

function getAdminClientOrNull(): SupabaseClient | null {
  try {
    return getSupabaseAdminClient();
  } catch {
    return null;
  }
}

async function ensureContentBucket(admin: SupabaseClient) {
  if (bucketEnsured) return;

  const { data: buckets, error } = await admin.storage.listBuckets();
  if (error) {
    throw new Error(`STORAGE_LIST_BUCKETS_FAILED:${error.message}`);
  }

  const exists = (buckets || []).some((bucket) => bucket.name === CONTENT_BUCKET);
  if (!exists) {
    const { error: createError } = await admin.storage.createBucket(CONTENT_BUCKET, {
      public: true,
      fileSizeLimit: 10 * 1024 * 1024,
      allowedMimeTypes: [
        "application/json",
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/gif",
        "image/avif",
      ],
    });

    if (createError) {
      throw new Error(`STORAGE_CREATE_BUCKET_FAILED:${createError.message}`);
    }
  }

  bucketEnsured = true;
}

async function readContentStoreFromSupabase(admin: SupabaseClient): Promise<ContentStore | null> {
  await ensureContentBucket(admin);

  const { data, error } = await admin.storage.from(CONTENT_BUCKET).download(CONTENT_JSON_PATH);
  if (error) {
    if (
      error.message.toLowerCase().includes("not found") ||
      error.message.toLowerCase().includes("no such")
    ) {
      return {};
    }
    throw new Error(`STORAGE_DOWNLOAD_CONTENT_FAILED:${error.message}`);
  }

  const raw = await data.text();
  if (!raw.trim()) return {};

  const parsed = JSON.parse(raw) as ContentStore;
  return parsed && typeof parsed === "object" ? parsed : {};
}

async function writeContentStoreToSupabase(admin: SupabaseClient, nextStore: ContentStore) {
  await ensureContentBucket(admin);

  const payload = JSON.stringify(nextStore, null, 2);
  const { error } = await admin.storage.from(CONTENT_BUCKET).upload(CONTENT_JSON_PATH, payload, {
    upsert: true,
    contentType: "application/json",
  });

  if (error) {
    throw new Error(`STORAGE_UPLOAD_CONTENT_FAILED:${error.message}`);
  }
}

async function readContentStore(): Promise<ContentStore> {
  const admin = getAdminClientOrNull();
  if (admin) {
    try {
      const storageStore = await readContentStoreFromSupabase(admin);
      if (storageStore) return storageStore;
    } catch {
      // fallback to local file for local development
    }
  }

  try {
    const raw = await readFile(CONTENT_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as ContentStore;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function writeContentStore(nextStore: ContentStore) {
  const admin = getAdminClientOrNull();
  if (admin) {
    await writeContentStoreToSupabase(admin, nextStore);
    return;
  }

  try {
    await mkdir(path.dirname(CONTENT_FILE_PATH), { recursive: true });
    await writeFile(CONTENT_FILE_PATH, JSON.stringify(nextStore, null, 2), "utf-8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "EROFS") {
      throw new Error("READ_ONLY_FS");
    }
    throw error;
  }
}

export async function getSiteContentSection<T>(
  section: SiteContentSection,
  fallback: T,
): Promise<T> {
  noStore();

  try {
    const store = await readContentStore();
    const value = store[section];
    if (value == null) {
      return fallback;
    }

    return value as T;
  } catch {
    return fallback;
  }
}

export async function saveSiteContentSection(
  section: SiteContentSection,
  value: unknown,
) {
  const store = await readContentStore();
  store[section] = value;
  await writeContentStore(store);
}

export async function saveSiteContentImage(
  section: SiteContentSection,
  file: File,
): Promise<string> {
  const extFromType = file.type.startsWith("image/")
    ? file.type.split("/")[1]
    : "";
  const extFromName = file.name.includes(".")
    ? file.name.split(".").pop() || ""
    : "";
  const ext = (extFromType || extFromName || "png").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  const fileName = `${Date.now()}-${randomUUID()}.${ext || "png"}`;

  const admin = getAdminClientOrNull();
  if (admin) {
    await ensureContentBucket(admin);
    const objectPath = `images/${section}/${fileName}`;
    const arrayBuffer = await file.arrayBuffer();

    const { error } = await admin.storage
      .from(CONTENT_BUCKET)
      .upload(objectPath, Buffer.from(arrayBuffer), {
        upsert: false,
        contentType: file.type || "application/octet-stream",
      });

    if (error) {
      throw new Error(`STORAGE_UPLOAD_IMAGE_FAILED:${error.message}`);
    }

    const {
      data: { publicUrl },
    } = admin.storage.from(CONTENT_BUCKET).getPublicUrl(objectPath);

    return publicUrl;
  }

  const relativeDir = path.join("uploads", "content", section);
  const absoluteDir = path.join(process.cwd(), "public", relativeDir);
  const absolutePath = path.join(absoluteDir, fileName);

  try {
    await mkdir(absoluteDir, { recursive: true });
    const arrayBuffer = await file.arrayBuffer();
    await writeFile(absolutePath, Buffer.from(arrayBuffer));
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "EROFS") {
      throw new Error("READ_ONLY_FS_UPLOAD");
    }
    throw error;
  }

  return `/${relativeDir}/${fileName}`.replaceAll("\\", "/");
}

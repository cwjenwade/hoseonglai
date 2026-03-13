import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { unstable_noStore as noStore } from "next/cache";

export type SiteContentSection =
  | "brand_philosophy_team"
  | "heartfelt_momentum_videos"
  | "fortune_arrives_lectures"
  | "togetherness_groups"
  | "collaborative_prosperity_projects";

const CONTENT_FILE_PATH = path.join(process.cwd(), "data", "site-content.json");

type ContentStore = Partial<Record<SiteContentSection, unknown>>;

async function readContentStore(): Promise<ContentStore> {
  try {
    const raw = await readFile(CONTENT_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as ContentStore;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function writeContentStore(nextStore: ContentStore) {
  await mkdir(path.dirname(CONTENT_FILE_PATH), { recursive: true });
  await writeFile(CONTENT_FILE_PATH, JSON.stringify(nextStore, null, 2), "utf-8");
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
  const relativeDir = path.join("uploads", "content", section);
  const absoluteDir = path.join(process.cwd(), "public", relativeDir);
  const absolutePath = path.join(absoluteDir, fileName);

  await mkdir(absoluteDir, { recursive: true });
  const arrayBuffer = await file.arrayBuffer();
  await writeFile(absolutePath, Buffer.from(arrayBuffer));

  return `/${relativeDir}/${fileName}`.replaceAll("\\", "/");
}

import { cookies, headers } from "next/headers";

const LOCAL_ADMIN_COOKIE = "hoseonglai_local_admin_preview";
const LOCAL_ADMIN_COOKIE_VALUE = "admin-preview";

function isLocalHost(host: string | null) {
  if (!host) return false;
  const normalizedHost = host.toLowerCase().split(",")[0].trim();

  return (
    normalizedHost === "localhost" ||
    normalizedHost.startsWith("localhost:") ||
    normalizedHost === "127.0.0.1" ||
    normalizedHost.startsWith("127.0.0.1:") ||
    normalizedHost === "[::1]" ||
    normalizedHost.startsWith("[::1]:")
  );
}

export async function isLocalAdminPreviewRequest() {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("host") || requestHeaders.get("x-forwarded-host");

  return process.env.VERCEL !== "1" && isLocalHost(host);
}

export async function isLocalAdminPreviewAuthenticated() {
  if (!(await isLocalAdminPreviewRequest())) return false;

  const cookieStore = await cookies();
  return cookieStore.get(LOCAL_ADMIN_COOKIE)?.value === LOCAL_ADMIN_COOKIE_VALUE;
}

export async function setLocalAdminPreviewSession() {
  const cookieStore = await cookies();
  cookieStore.set(LOCAL_ADMIN_COOKIE, LOCAL_ADMIN_COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 8 * 60 * 60,
  });
}

export async function clearLocalAdminPreviewSession() {
  const cookieStore = await cookies();
  cookieStore.delete(LOCAL_ADMIN_COOKIE);
}

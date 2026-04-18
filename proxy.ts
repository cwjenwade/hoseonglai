import { NextRequest, NextResponse } from "next/server";

const BLOCKED_PATH_PATTERNS = [
  /^\/wp-admin(?:\/|$)/i,
  /^\/wp-login\.php$/i,
  /^\/xmlrpc\.php$/i,
  /^\/phpmyadmin(?:\/|$)/i,
  /^\/\.env(?:\.|$)/i,
  /^\/\.git(?:\/|$)/i,
  /^\/vendor\/phpunit(?:\/|$)/i,
  /^\/boaform\/admin\/formlogin$/i,
  /^\/server-status$/i,
  /^\/_profiler(?:\/|$)/i,
];

function shouldBlockPath(pathname: string): boolean {
  return BLOCKED_PATH_PATTERNS.some((pattern) => pattern.test(pathname));
}

export function proxy(req: NextRequest) {
  if (shouldBlockPath(req.nextUrl.pathname)) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};

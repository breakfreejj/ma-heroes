import { NextResponse, type NextRequest } from "next/server";

// Middleware temporarily disabled: was hitting MIDDLEWARE_INVOCATION_FAILED on
// Vercel edge runtime — root cause TBD. The /customize page does its own auth
// check via createClient() in app/customize/page.tsx, so security is intact;
// we just lose the early-redirect-to-/login UX until we re-enable this.
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};

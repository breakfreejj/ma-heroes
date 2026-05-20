import { NextResponse, type NextRequest } from "next/server";

// Lightweight auth gate for /customize. We only check for the *presence* of
// a Supabase session cookie — actual validation + token refresh happens in
// app/customize/page.tsx via createServerClient (which IS edge-incompatible,
// so we keep it out of middleware). This avoids the __dirname / ERR_MODULE_NOT_FOUND
// errors from @supabase/ssr when bundled for the edge runtime.
export function proxy(request: NextRequest) {
  const isProtected = request.nextUrl.pathname.startsWith("/customize");
  if (!isProtected) return NextResponse.next();

  const hasSession = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token"));

  if (hasSession) return NextResponse.next();

  const redirect = request.nextUrl.clone();
  redirect.pathname = "/login";
  redirect.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(redirect);
}

export const config = {
  matcher: ["/customize/:path*"],
};

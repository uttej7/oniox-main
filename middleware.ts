import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public paths that never require authentication
const PUBLIC_PATHS = ["/", "/login", "/hr-login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token    = request.cookies.get("orionx_auth_token")?.value;
  const userJson = request.cookies.get("orionx_user")?.value;

  const isPublicPath = PUBLIC_PATHS.some((p) =>
    pathname === p || pathname.startsWith(p + "?")
  );

  // ── Unauthenticated ────────────────────────────────────────────────────────
  if (!token && !isPublicPath) {
    // HR routes → HR login
    if (pathname.startsWith("/hr")) {
      const dest = new URL("/hr-login", request.url);
      dest.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(dest);
    }
    // Everything else → Admin/IT login
    const dest = new URL("/login", request.url);
    dest.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(dest);
  }

  // ── Authenticated user on a public (login/portal) page → go home ──────────
  if (token && isPublicPath) {
    try {
      const user = JSON.parse(decodeURIComponent(userJson ?? "{}"));
      const home = user.roleType === "hr" ? "/hr/dashboard" : "/dashboard";
      return NextResponse.redirect(new URL(home, request.url));
    } catch {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // ── Role-based cross-portal guard ─────────────────────────────────────────
  if (token && userJson) {
    try {
      const user = JSON.parse(decodeURIComponent(userJson));

      // HR users → must stay in /hr/* space
      if (user.roleType === "hr" && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/hr/dashboard", request.url));
      }

      // Admin/IT users → must stay in /dashboard/* space
      if (user.roleType !== "hr" && pathname.startsWith("/hr")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch {
      // malformed cookie – let the page handle it
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg).*)",
  ],
};

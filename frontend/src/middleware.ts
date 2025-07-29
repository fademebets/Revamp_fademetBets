import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define route permissions
const ROUTE_PERMISSIONS = {
  PUBLIC: ["/", "/blogs", "/blog", "/login", "/parley-calc", "/ev-calc", "/success", "/forget-password", "/about", "/services", "/terms", "/privacy"],

  USER: ["/userProfile", "/user-picks", "/user-lock-of-the-day", "/chat"],

  ADMIN: ["/dashboard", "/admin-blog", "/ev-picks", "/lock-of-the-day", "/all-user", "/admin-chat", "/all-sales", "/settings"],
};

// Helper to check if a path matches a given pattern list
function matchesPath(pathname: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    if (pathname === pattern) return true;
    if (pathname.startsWith(pattern + "/")) return true;
    return false;
  });
}

// Read cookies and get token/role
function getUserFromCookies(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const role = request.cookies.get("user-role")?.value as "user" | "admin" | undefined;

  return {
    token,
    role,
    isAuthenticated: !!token && !!role,
  };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = getUserFromCookies(request);

  const isPublicRoute = matchesPath(pathname, ROUTE_PERMISSIONS.PUBLIC);

  // ✅ If user is already logged in and tries to access /login — redirect to dashboard/userProfile
  if (pathname === "/login" && user.isAuthenticated) {
    const redirectUrl = user.role === "admin" ? "/dashboard" : "/userProfile";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // If route is public, allow
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login for non-public routes
  if (!user.isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check User-only routes
  if (matchesPath(pathname, ROUTE_PERMISSIONS.USER)) {
    if (user.role !== "user") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Check Admin-only routes
  if (matchesPath(pathname, ROUTE_PERMISSIONS.ADMIN)) {
    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/userProfile", request.url));
    }
    return NextResponse.next();
  }

  // Fallback — redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}

// Middleware matcher config
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

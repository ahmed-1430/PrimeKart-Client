import { NextResponse } from "next/server";

/**
 * PrimeKart Admin Middleware
 * - Protects /admin routes
 * - Requires JWT token in cookie
 */
export function middleware(req) {
    const token = req.cookies.get("primekart_token")?.value;
    const { pathname } = req.nextUrl;

    // Protect admin routes
    if (pathname.startsWith("/admin")) {
        // Not logged in
        if (!token) {
            const loginUrl = new URL("/login", req.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};

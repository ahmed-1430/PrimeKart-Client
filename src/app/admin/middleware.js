import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("primekart_token")?.value;

    // if no token, redirect to login
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // allow the request
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Protect /admin routes
export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;

    // Allow public paths like /admin/login
    if (pathname.startsWith("/admin/login")) return NextResponse.next();

    // Check if user is logged in
    const token = req.nextauth.token;
    if (!token) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // allow if logged in
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};

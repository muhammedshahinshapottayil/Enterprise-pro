import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: any) {
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token[0].role !== "admin"
    )
      return NextResponse.rewrite(
        new URL("/auth/login?message=You Are Not Authorized!", req.url)
      );

    if (
      req.nextUrl.pathname.startsWith("/supervisor") &&
      req.nextauth.token[0].role !== "supervisor"
    )
      return NextResponse.rewrite(
        new URL("/auth/login?message=You Are Not Authorized!", req.url)
      );

    if (
      req.nextUrl.pathname.startsWith("/user") &&
      req.nextauth.token[0].role !== "user"
    )
      return NextResponse.rewrite(
        new URL("/auth/login?message=You Are Not Authorized!", req.url)
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/supervisor/:path*"],
};

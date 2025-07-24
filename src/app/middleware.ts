import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoutes = ["dashboard"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isPrivate = privateRoutes.includes(request.nextUrl.pathname);

  if (isPrivate && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

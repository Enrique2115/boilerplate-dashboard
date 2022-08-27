import { NextResponse } from "next/server";

export default function middleware(req) {
  const { url, nextUrl, cookies } = req;
  const token = cookies.get("token");

  //   const validation = ["/admin", "/employee", "/account", "/settings"];

  //   if (validation.some((value) => nextUrl.pathname.includes(value))) {
  if (token === undefined) {
    return NextResponse.redirect(new URL("/login", url));
  }
  try {
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", url));
  }
  //   }
  //   return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/employee/:path*", "/account", "/settings"],
};

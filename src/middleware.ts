import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib";

const authenticationRoutes = ["/auth"];

const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (authenticationRoutes.includes(request.nextUrl.pathname) && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (protectedRoutes.includes(request.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return null;
}

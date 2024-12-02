import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const disabledAuthMiddlewareRoutes = ["/auth/login"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (disabledAuthMiddlewareRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  const authToken = request.cookies.get("authToken");
  if (!authToken) {
    return NextResponse.redirect(
      new URL("/auth/login?next=" + request.nextUrl.pathname, request.url)
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
};

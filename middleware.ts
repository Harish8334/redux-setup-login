import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your-secret-key"; // Use the same secret key

export function middleware(req: NextRequest) {
  const loginPath = "/login";
  const protectedRoutes = ["/", "/about"];

  // Get token from cookies
  const token = req.cookies.get("token")?.value;

  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL(loginPath, req.url));
    }

    try {
      jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return NextResponse.redirect(new URL(loginPath, req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/", "/about"],
};

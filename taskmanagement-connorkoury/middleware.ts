import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  try {
    const secret = process.env.JWT_SECRET!;
    require("jsonwebtoken").verify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/tasks/:path*"],
};

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your-secret-key"; // Use the same secret key as in login

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ message: "Protected data", user: decoded });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}

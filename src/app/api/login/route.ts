import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid"; // Generate unique ID

const SECRET_KEY = "your-secret-key"; // Use a real secret key in production

const users = [
  { username: "admin", password: "password" },
  { username: "user", password: "1234" },
];

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Find user in fake database
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate unique JWT token with extra fields
  const token = jwt.sign(
    {
      username,
      iat: Math.floor(Date.now() / 1000), // Issued at time (UNIX timestamp)
      jti: uuidv4(), // Unique token ID
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  return NextResponse.json({ token }, { status: 200 });
}

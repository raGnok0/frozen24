import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  // Set the cookie
  const serialized = serialize("authToken", token, {
    httpOnly: true, // Prevents access via JavaScript
    secure: process.env.NEXT_PUBLIC_NODE_ENV === "production", // Ensures HTTPS in production
    sameSite: "strict", // Prevents CSRF attacks
    maxAge: 60 * 60 * 24, // 1 day
    path: "/", // Cookie available on all pages
  });

  res.setHeader("Set-Cookie", serialized);
  res.status(200).json({ message: "Login successful" });
}

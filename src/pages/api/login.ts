import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    // Here you would typically:
    // 1. Validate the email and password
    // 2. Check against your database
    // 3. Create a session or JWT token

    // For this example, we'll just return a mock successful response
    // Replace this with your actual authentication logic
    const mockUser = {
      id: "1",
      name: "John Doe",
      email: email,
      role: "tech-lead",
    };

    return res.status(200).json({
      message: "Login successful",
      user: mockUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

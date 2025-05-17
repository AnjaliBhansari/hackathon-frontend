import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, password, role } = req.body;

    // Here you would typically:
    // 1. Validate all input fields
    // 2. Check if user already exists
    // 3. Hash the password
    // 4. Store in your database
    // 5. Create a session or JWT token

    // For this example, we'll just return a mock successful response
    // Replace this with your actual registration logic
    const mockUser = {
      id: "1",
      name,
      email,
      role,
    };

    return res.status(201).json({
      message: "Account created successfully",
      user: mockUser,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

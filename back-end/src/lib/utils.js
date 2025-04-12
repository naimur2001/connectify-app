import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration (7 days)
      httpOnly: true, // Prevent XSS attacks
      sameSite: "strict", // Prevent CSRF attacks
      secure: process.env.NODE_ENV === "development", // Use secure cookies only in production
    });

  } catch (error) {
    console.error("Error generating token:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

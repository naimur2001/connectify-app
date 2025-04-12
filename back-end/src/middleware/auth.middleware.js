import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Accessing the JWT token from req.cookies
    const token = req.cookies.jwt; 

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // Verifying the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Token is not valid" });
    }

    // Finding the user based on the decoded token
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach the user to the request object for use in the next middleware
    next();

  } catch (error) {
    console.log("Error in protect route controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

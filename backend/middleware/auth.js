import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        console.log("User not found with id:", decoded.id);
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      console.log("User authenticated:", req.user._id.toString());
      return next();
    } catch (error) {
      console.error("Token verification failed: ", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  console.log("No token provided in headers");
  return res.status(401).json({ message: "Not authorized, no token" });
};

import jwt from "jsonwebtoken";
import supabase from "../services/auth.js";

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { user, error } = await supabase.api.getUser(token);

    if (error || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // If user is authenticated, generate JWT token
    const jwtPayload = {
      userId: user.id,
      email: user.email,
    };

    const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Attach JWT token to response headers or send it in response body
    res.setHeader("Authorization", `Bearer ${jwtToken}`);
    req.user = jwtPayload; // Attach user data to request object for further middleware or route handler access

    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authenticate;

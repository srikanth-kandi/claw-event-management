import express from "express";
import User from "../models/User.js";
import Session from "../models/Session.js";
import supabase from "../services/auth.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Check if user already exists in MongoDB
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Sign up user using Supabase
  try {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Supabase SignUp Error:", error);
      return res.status(400).json(error);
    }

    // Save user to MongoDB
    const newUser = new User({ email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json(error);
    }

    // Create session record in MongoDB
    const newSession = new Session({
      userId: data.user.id,
      loginTime: new Date(),
      ipAddress: req.ip,
    });
    await newSession.save();

    res.json({ token: data.session.access_token, user_id: data.user.id });
  } catch (error) {
    console.error("Supabase SignIn Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;

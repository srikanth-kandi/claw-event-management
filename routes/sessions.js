import express from "express";
import Session from "../models/Session";

const router = express.Router();

// Retrieve sessions
router.get("/", async (req, res) => {
  const { userId } = req.query;
  const sessions = await Session.find({ userId });
  res.json(sessions);
});

module.exports = router;

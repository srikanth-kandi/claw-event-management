import express from "express";
import authenticate from "../middleware/authenticate.js";
import Event from "../models/Event.js";

const router = express.Router();

router.use(authenticate);

// Create Event
router.post("/", async (req, res) => {
  const { name, date, location, description } = req.body;
  const event = new Event({
    name,
    date,
    location,
    description,
    userId: req.user.userId,
  });
  await event.save();
  res.status(201).json(event);
});

// Read Events
router.get("/", async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }
  const events = await Event.find({ userId });
  res.json(events);
});

// Update Event
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, date, location, description } = req.body;
  const event = await Event.findByIdAndUpdate(
    id,
    { name, date, location, description },
    { new: true }
  );
  res.json(event);
});

// Delete Event
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Event.findByIdAndDelete(id);
  res.status(204).send();
});

export default router;

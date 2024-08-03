import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import authenticate from "./middleware/authenticate.js";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";
import weatherRoutes from "./routes/weather.js";
import fs from "fs";

config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/weather", weatherRoutes);

// Authenticate Middleware
app.use("/api/events", authenticate);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Event Management API!");
});

app.get("/locations", (req, res) => {
  // load locations.json file
  const locations = JSON.parse(fs.readFileSync("city.list.min.json"));
  res.json(locations);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

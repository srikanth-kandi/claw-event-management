import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  description: String,
  userId: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model("Event", eventSchema);

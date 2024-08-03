import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: String,
  loginTime: Date,
  logoutTime: Date,
  ipAddress: String,
});

export default mongoose.model("Session", sessionSchema);

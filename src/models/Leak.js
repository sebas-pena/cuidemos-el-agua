import mongoose, { model, Schema } from "mongoose";

const LeakSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  image: String,
});

export const Leak = mongoose.models.Leak || model("Leak", LeakSchema);

import mongoose, { model, Schema } from "mongoose";

const LeakSchema = new Schema({
  description: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  closedAt: {
    type: Date,
    default: null,
  },
}, {
  versionKey: false,
  timestamps: false
});

export const Leak = mongoose.models.Leak || model("Leak", LeakSchema);
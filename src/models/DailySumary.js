import mongoose, { model, Schema } from "mongoose";

const DailySummarySchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  count: {
    type: Number,
    default: 0,
  }
}, {
  versionKey: false,
  timestamps: false
});

export const DailySummary = mongoose.models.DailySummary || model("DailySummary", DailySummarySchema);

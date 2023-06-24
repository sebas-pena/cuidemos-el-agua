import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  verificationCode: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    required: true,
  },
  phoneVerified: {
    type: Boolean,
    required: true,
  },
}, {
  versionKey: false,
  timestamps: false
});

export const User = mongoose.models.User || model("User", UserSchema);

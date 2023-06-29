import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    index: true,
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
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  banned: {
    type: Boolean,
    default: false,
  },
}, {
  versionKey: false,
  timestamps: false
});

export const User = mongoose.models.User || model("User", UserSchema);

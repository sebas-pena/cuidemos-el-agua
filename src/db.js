import { connect } from "mongoose";

export const dbConnection = () => connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
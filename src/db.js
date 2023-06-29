import { connect } from "mongoose";

export const dbConnection = () => {
  if (!global.db) {
    global.db = true;
    return connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }
}
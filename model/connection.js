require("dotenv").config();
import mongoose from "mongoose";

const mongoDBConnect = () => {
  try {
    mongoose
      .connect(process.env.MONGO_CONNECTION_URL)
      .then(() => {
        console.log("Mongo connected");
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log("error", error);
  }
};

export default mongoDBConnect;

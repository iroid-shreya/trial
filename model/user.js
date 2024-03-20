import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  images: {
    type: [
      {
        type: String,
      },
    ],
  },
});

const User = mongoose.model("users", userSchema);
export default User;

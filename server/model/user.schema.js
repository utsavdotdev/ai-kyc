import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  avatar: {
    type: String,
  },
  role:{
    type:Array,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const User = mongoose.model("User", userSchema);
export default User;

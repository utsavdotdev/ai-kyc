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
  createdAt: {
    type: Date,
    default: new Date(),
  },
  orgName:{
    type:String,
  }
});
const User = mongoose.model("User", userSchema);
export default User;

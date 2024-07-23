import FilledUser from "../model/filleduser.schema.js";
import User from "../model/user.schema.js";
import UserToken from "../model/userToken.schema.js";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password-__v");

    if (!user) {
      return res.status(404).json({ error: true, msg: "User not found!" });
    }
    res.status(200).json({ error: false, user, msg: "User data extracted" });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
};

export const userLogout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const { error, tokenDetails, msg } = verifyRefreshToken(refreshToken);
    if (error) {
      return res.status(401).json({ error, msg });
    }
    const { _id } = tokenDetails;
    const deletedToken = await UserToken.findOne({ userId: _id });
    if (!deletedToken) {
      return res.status(404).json({ error: true, msg: "Token not found" });
    }
    await deletedToken.deleteOne();
    res.status(200).json({ error: false, msg: "Token deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
};

// fetch the data of user whose formid is req.params.formId
export const getuserofForm = async (req, res) => {
  console.log(req.params.formId);
  try {
    const filledUser = await FilledUser.find({ formId: req.params.formId });
    if (!filledUser) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(filledUser);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Error fetching user data" });
  }
};

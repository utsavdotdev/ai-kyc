import User from "../model/user.schema.js";
import generateToken from "../utils/generateToken.js";
export const AuthController = async (req, res) => {
  try {
    const { name, email, picture, location } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      const { accessToken, refreshToken } = await generateToken(user._id);
      return res.status(200).json({
        error: false,
        accessToken,
        refreshToken,
        role: location == "form" ? "formuser" : "org",
        msg: "Auth Success",
      });
    }
    const newUser = await new User({
      username: name,
      email,
      avatar: picture,
      orgName: name + "-" + Math.floor(Math.random() * 1000),
    }).save();
    const { accessToken, refreshToken } = await generateToken(newUser._id);
    res.status(200).json({
      error: false,
      accessToken,
      refreshToken,
      role: location == "form" ? "formuser" : "org",
      msg: "Auth Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
};

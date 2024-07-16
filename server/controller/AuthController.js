import User from "../model/user.schema.js";
import generateToken from "../utils/generateToken.js";
export const AuthController = async (req, res) => {
  try {
    const { name, email, imageUrl,location } = req.body;

    const user = await User.findOne({ email: email });

    if(location = 'form'){
       if (user) {
         const { accessToken, refreshToken } = await generateToken(user._id);
         //check the role of user if it is org then add role formuser
         return res.status(200).json({
           error: false,
           accessToken,
           refreshToken,
           msg: "Auth Success",
         });
       }
       const newUser = await new User({
         username: name,
         email,
         profilePic: imageUrl,
       }).save();
       const { accessToken, refreshToken } = await generateToken(newUser._id);
       res.status(200).json({
         error: false,
         accessToken,
         refreshToken,
         msg: "Signup Successfully",
       });
    }
    else{

    }

   
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
};

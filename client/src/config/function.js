import axios from "../config/axios.js";

export const auth = async (name, email, picture, location) => {
  try {
    const res = await axios.post("/auth", {
      email,
      name,
      picture,
      location,
    });
    console.log(res);
    const { accessToken, refreshToken, msg, role } = res.data;
    const userInfo = {
      accessToken,
      refreshToken,
      user: role,
    };
    console.log(msg);
    return userInfo;
  } catch (error) {
    console.log("Error while", error);
  }
};

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { auth } from "../config/function.js";

const Navbar = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          const { name, email, picture } = res.data;
          const response = await auth(name, email, picture, "dash");
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
          localStorage.setItem("role", response.user);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <>
      <div className="w-full flex justify-center items-center p-4">
        <div className="w-full sm:w-[90%] rounded-lg h-16 border-[2px] flex items-center justify-between px-2 sm:px-4 py-2">
          <div className="h-full flex justify-center items-center">
            <p className="text-3xl text-text font-semibold font-pops">
              KYC<span className="text-highlight"> Master</span>
            </p>
          </div>
          <div className="h-full flex gap-2 justify-center items-center sm:gap-5">
            <>
              <Button size={"sm"} onClick={login}>
                <p className="sm:after:content-[' with Github'] font-pops">
                  Login
                </p>
              </Button>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

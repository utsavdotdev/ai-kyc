import React, { createContext, useEffect, useState } from "react";
import axios from "./axios.js";
export const ContextProvider = createContext();

const Context = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const role = localStorage.getItem("role");
  const [user, setUser] = useState();
  const [myForm, setmyForm] = useState([]);

  useEffect(() => {
    if (accessToken !== null && role === "org") {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    getForms();
  }, [user]);

  const getForms = async () => {
    try {
      const res = await axios.get(`/form/get/${user?._id}`);
      setmyForm(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //getting access token through refresh token
  const getAccessToken = async () => {
    try {
      if (refreshToken) {
        const res = await axios.post("/token/refresh", {
          refreshToken: refreshToken,
        });
        if (res) {
          //set the access token in local storage of userInfo
          localStorage.setItem("accessToken", res.data.accessToken);
          return res.data.accessToken;
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        window.location.replace("/");
      }
      console.log(error);
    }
  };

  //fetching user details from accestoken
  const fetchUser = async () => {
    try {
      const res = await axios.get("/user", {
        headers: {
          "x-access-token": accessToken,
        },
      });
      setUser(res?.data?.user);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const accessTok = await getAccessToken();
        const res = await axios.get("/user", {
          headers: {
            "x-access-token": accessTok,
          },
        });
        localStorage.setItem("user_id", res?.data?.user?._id);
        setUser(res?.data?.user);
      }
      console.log(error);
    }
  };

  return (
    <>
      <ContextProvider.Provider
        value={{
          user,
          setUser,
          myForm,
        }}
      >
        {children}
      </ContextProvider.Provider>
    </>
  );
};

export default Context;

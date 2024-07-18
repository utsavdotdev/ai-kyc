import React, { useState, useEffect } from "react";
import "../styles/fillform.css";
import { Navigate } from "react-router-dom";
import StepIndicator from "../components/StepIndicator";
import PersonalDetails from "../components/PersonalDetails";
import AddressDetails from "../components/AddressDetails";
import CameraAccess from "../components/CameraAccess";
import DocumentUpload from "../components/DocumentUpload";
import Review from "../components/Review";
import { X } from "lucide-react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import myaxios from "../config/axios";
import { auth } from "../config/function.js";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "formData"; // Key for local storage

const FillForm = () => {
  useEffect(async () => {
    const currentUrl = window.location.href;
    const match = currentUrl.match(/org-(.*)/);
    let extractedPart = "";
    if (match && match[1]) {
      extractedPart = match[1];
      console.log("Extracted Part:", extractedPart);
    } else {
      console.log("No match found.");
    }
    try {
      const res = await myaxios.post(`/form/checkUrl`, { id: extractedPart });
    } catch (error) {
      console.log(error);
      window.location.replace("/");
    }
  }, []);

  const role = localStorage.getItem("role");
  const access = localStorage.getItem("accessToken");
  const refresh = localStorage.getItem("refreshToken");

  const [step, setStep] = useState(1);
  const [user, setUser] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLogin, setIsLogin] = useState(role === "formuser" ? true : false);
  const [formData, setFormData] = useState(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData
      ? JSON.parse(storedData)
      : {
          firstName: "",
          lastName: "",
          email: "",
          dob: "",
          phone: "",
          zipCode: "",
          gender: "",
          identificationNumber: "",
          addressline1: "",
          adressline2: "",
          country: "",
        };
  });

  const [images, setImages] = useState({
    face: "",
    passport: "",
  });
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]); // Save data on any change in formData

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
          const response = await auth(name, email, picture, "form");
          localStorage.clear();
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
          localStorage.setItem("role", response.user);
          setIsLogin(true);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    if (access) {
      fetchUser();
    }
  }, [access]);

  //getting access token through refresh token
  const getAccessToken = async () => {
    try {
      if (refresh) {
        const res = await myaxios.post("/token/refresh", {
          refreshToken: refresh,
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

  const fetchUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await myaxios.get("/user", {
        headers: {
          "x-access-token": accessToken,
        },
      });
      setUserData(res?.data?.user);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const accessTok = await getAccessToken();
        const res = await myaxios.get("/user", {
          headers: {
            "x-access-token": accessTok,
          },
        });
        localStorage.setItem("user_id", res?.data?.user?._id);
        setUserData(res?.data?.user);
      }
      console.log(error);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // only for text type input
  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const Logout = async () => {
    await myaxios.post("/user/logout", { refreshToken: refresh }, header);
    setUserData([]);
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalDetails
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <AddressDetails
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <CameraAccess
            setImages={setImages}
            images={images}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <DocumentUpload
            setImages={setImages}
            images={images}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <Review
            id={userData._id}
            formData={formData}
            setImages={setImages}
            images={images}
            prevStep={prevStep}
          />
        );
      default:
        return (
          <PersonalDetails
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        );
    }
  };

  return (
    <>
      {isLogin ? (
        <>
          <div className="flex justify-end p-4 text-md">
            <div className="flex px-6 py-2 gap-4 border-2 rounded-full items-center">
              {userData?.username}
              <div
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-2 cursor-pointer"
                onClick={() => Logout()}
              >
                <X className="h-5 w-6" />
              </div>
            </div>
          </div>
          <div style={{ marginTop: "100px" }}>
            <StepIndicator currentStep={step} />
          </div>
          <div className="app">{renderStep()}</div>{" "}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#1AD086"
              fill-opacity="1"
              d="M0,160L40,138.7C80,117,160,75,240,69.3C320,64,400,96,480,138.7C560,181,640,235,720,218.7C800,203,880,117,960,85.3C1040,53,1120,75,1200,106.7C1280,139,1360,181,1400,202.7L1440,224L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
            ></path>
          </svg>

          <h1
            style={{
              fontSize: "1.5rem",
              padding: "10px",
            }}
          >
            Please Login to Fill the KYC Form of Esewa.
          </h1>
          <Button
            style={{
              display: "flex",
            }}
            onClick={login}
          >
            Login
          </Button>
        </div>
      )}
    </>
  );
};

export default FillForm;

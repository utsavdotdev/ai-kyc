import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import "../styles/fillform.css";
import StepIndicator from "../components/StepIndicator";
import PersonalDetails from "../components/PersonalDetails";
import AddressDetails from "../components/AddressDetails";
import CameraAccess from "../components/CameraAccess";
import DocumentUpload from "../components/DocumentUpload";
import Review from "../components/Review";

const STORAGE_KEY = "formData"; // Key for local storage

const FillForm = () => {
  const [step, setStep] = useState(1);
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
          // photo: "",
          // passport: "",
          gender: "",
          // natinality: "",
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

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // only for text type input
  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
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

  console.log(import.meta.env.VITE_API_URL);

  let isLogin = true;
  return (
    <>
      {isLogin ? (
        <>
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
          >
            Login
          </Button>
        </div>
      )}
    </>
  );
};

export default FillForm;

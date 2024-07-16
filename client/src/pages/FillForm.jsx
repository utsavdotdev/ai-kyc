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
          photo: "",
          passport: "",
          gender: "",
          // natinality: "",
          identificationNumber: "",
          addressline1: "",
          adressline2: "",
          country: "",
        };
  });
  console.log(formData);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]); // Save data on any change in formData

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // only for text type input
  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleFileChange = (fieldName) => (file) => {
    setFormData({ ...formData, [fieldName]: file });
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
            setFormData={setFormData}
            formData={formData}
            handleFileChange={handleFileChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <DocumentUpload
            setFormData={setFormData}
            formData={formData}
            handleFileChange={handleFileChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return <Review formData={formData} prevStep={prevStep} />;
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
      <div style={{ marginTop: "100px" }}>
        <StepIndicator currentStep={step} />
      </div>
      <div className="app">{renderStep()}</div>
    </>
  );
};

export default FillForm;

import React, { useState } from "react";
import "../styles/fillform.css";

import StepIndicator from "../components/StepIndicator";
import PersonalDetails from "../components/PersonalDetails";
import AddressDetails from "../components/AddressDetails";
import CameraAccess from "../components/CameraAccess";
import DocumentUpload from "../components/DocumentUpload";
import Review from "../components/Review";

const FillForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
    zipCode: "",
    photo: null,
    passport: null,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleFileChange = (input) => (file) => {
    setFormData({ ...formData, [input]: file });
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
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <DocumentUpload
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
      <StepIndicator currentStep={step} />
      <div className="app">{renderStep()}</div>
    </>
  );
};

export default FillForm;

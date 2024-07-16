import React from "react";

const StepIndicator = ({ currentStep, handleStepClick }) => {
  const steps = [
    {
      id: 1,
      title: "Personal Info",
    },
    {
      id: 2,
      title: "Address Info",
    },
    {
      id: 3,
      title: "Photo Upload",
    },
    {
      id: 4,
      title: "Docs Upload",
    },
    {
      id: 5,
      title: "Review",
    },
  ];

  return (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div
            // onClick={() => handleStepClick(step.id)}
            className={`step ${currentStep >= step.id ? "active" : ""}`}
          >
            {step.id}
          </div>
          {index < steps.length - 1 && <div className="step-connector"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;

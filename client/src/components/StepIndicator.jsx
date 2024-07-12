import React from "react";

const StepIndicator = ({ currentStep }) => {

  const steps = [{
    id:1,
    title:"Personal Info"
  },
  {
    id:2,
    title:"Address Info"
  },
  {
    id:3,
    title:"Photo Upload"
  },
  {
    id:4,
    title:"Docs Upload"
  },
  {
    id:5,
    title:"Review"
  }

]
  return (
    <div className="step-indicator">
      {[1, 2, 3, 4, 5].map((step, index) => (
        <React.Fragment key={step}>
          <div className={`step ${currentStep >= step ? "active" : ""}`}>
            {step}
          </div>
          {index < 4 && <div className="step-connector"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;

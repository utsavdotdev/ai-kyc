import React from "react";

const DocumentUpload = ({ formData, handleFileChange, nextStep, prevStep }) => {
  const onFileChange = (e) => {
    handleFileChange("passport")(e.target.files[0]);
  };

  return (
    <div className="form-step">
      <h2>Document Upload</h2>
      <input type="file" onChange={onFileChange} accept="image/*" />
      <div className="nav-buttons">
        <button className="back-btn" onClick={prevStep}>
          Back
        </button>
        <button className="next-btn" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;

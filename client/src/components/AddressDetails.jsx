import React from "react";

const AddressDetails = ({ formData, handleChange, nextStep, prevStep }) => {
  return (
    <div className="form-step">
      <h2>Address Details</h2>
      <div className="form-row">
        <input
          type="text"
          placeholder="Permanent Address"
          value={formData.address}
          onChange={handleChange("address")}
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={formData.zipCode}
          onChange={handleChange("zipCode")}
        />
      </div>
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

export default AddressDetails;

import React from "react";

const Review = ({ formData, prevStep }) => {
  const handleSubmit = () => {
    // Here you would typically send the form data to a server
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="form-step">
      <h2>Review and Submit</h2>
      <div className="review-content">
        <p>
          <strong>Name:</strong> {formData.firstName} {formData.lastName}
        </p>
        <p>
          <strong>Date of Birth:</strong> {formData.dob}
        </p>
        <p>
          <strong>Phone:</strong> {formData.phone}
        </p>
        <p>
          <strong>Address:</strong> {formData.address}
        </p>
        <p>
          <strong>Zip Code:</strong> {formData.zipCode}
        </p>
        <p>
          <strong>Photo:</strong> {formData.photo ? "Captured" : "Not captured"}
        </p>
        <p>
          <strong>Passport:</strong>{" "}
          {formData.passport ? formData.passport.name : "Not uploaded"}
        </p>
      </div>
      <div className="nav-buttons">
        <button className="back-btn" onClick={prevStep}>
          Back
        </button>
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Review;

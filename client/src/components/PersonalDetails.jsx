import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PersonalDetails = ({ formData, handleChange, nextStep }) => {
  console.log(formData);

  return (
    <div className="form-step">
      <h2>Personal Details</h2>
      <div className="form-row">
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange("firstName")}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange("lastName")}
        />
      </div>
      <div className="form-row">
        <input
          type="date"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange("dob")}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange("phone")}
        />
      </div>
      <button className="next-btn" onClick={nextStep}>
        Next
      </button>
    </div>
  );
};

export default PersonalDetails;

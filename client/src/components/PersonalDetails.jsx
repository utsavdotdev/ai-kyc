import React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PersonalDetails = ({ formData, handleChange, nextStep }) => {
  console.log(formData);

  return (
    <>
      <div className="grid w-full max-w-md items-center gap-3">
        <span className="form_heading ">Personal Details</span>
        <div className="flex gap-3">
          <Input
            className="h-11"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange("firstName")}
          />
          <Input
            className="h-11"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange("lastName")}
          />
        </div>
        <Input
          className="h-11"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange("email")}
        />
        <input
          // className="h-11"
          className="date_picker"
          type="date"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange("dob")}
        />
        <Input
          className="h-11"
          type="number"
          placeholder="Your Number"
          value={formData.phone}
          onChange={handleChange("phone")}
        />
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          className="controller"
        >
          <Button onClick={nextStep}>Next</Button>
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;

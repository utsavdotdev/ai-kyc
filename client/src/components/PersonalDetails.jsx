import React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const PersonalDetails = ({ formData, handleChange, nextStep }) => {
  const handleNext = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.dob ||
      !formData.phone
    ) {
      toast.error("Please fill all the fields.");
      return;
    }

    nextStep();
  };
  return (
    <>
      <form>
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
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PersonalDetails;

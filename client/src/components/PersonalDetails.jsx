import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PersonalDetails = ({ formData, handleChange, nextStep }) => {
  const [gender, setGender] = useState(formData.gender || "");

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    handleChange("gender")({ target: { value: selectedGender } });
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.dob ||
      !formData.phone ||
      !gender ||
      // !formData.natinality ||
      !formData.identificationNumber
    ) {
      console.log(formData);
      toast.error("Please fill all the fields.");
      return;
    }

    nextStep();
  };

  return (
    <>
      <form>
        <div className="grid w-full max-w-md items-center gap-3">
          <span className="form_heading">Personal Details</span>

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

          <div style={{ gap: "10px", display: "flex" }}>
            <input
              style={{ width: "50%" }}
              className="date_picker"
              type="date"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange("dob")}
            />

            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="h-11"
                style={{ width: "50%" }}
              >
                <Button variant="outline">{gender || "Select Gender"}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuCheckboxItem
                  checked={gender === "Male"}
                  onClick={() => handleGenderSelect("Male")}
                >
                  Male
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={gender === "Female"}
                  onClick={() => handleGenderSelect("Female")}
                >
                  Female
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={gender === "Other"}
                  onClick={() => handleGenderSelect("Other")}
                >
                  Other
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* <Input
            className="h-11"
            type="text"
            placeholder="Nationality"
            value={formData.natinality}
            onChange={handleChange("natinality")}
          /> */}
          <Input
            className="h-11"
            type="text"
            placeholder="Identification Number"
            value={formData.identificationNumber}
            onChange={handleChange("identificationNumber")}
          />

          <Input
            className="h-11"
            type="number"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange("phone")}
          />

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: "20px",
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

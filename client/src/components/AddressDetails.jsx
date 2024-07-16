import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const AddressDetails = ({ formData, handleChange, nextStep, prevStep }) => {
  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.addressline1 || !formData.addressline2 || !formData.zipCode) {
      toast.error("Please fill all the fields.");
      return;
    }
    //  allow zipline to 5 to 10 digits
    if (formData.zipCode.length < 5 || formData.zipCode.length > 10) {
      toast.error("Zip code must be between 5 to 10 digits");
      return;
    }
    nextStep();
  };
  return (
    <>
      <form className="form_container grid w-md max-w-md items-center gap-3">
        <span className="form_heading ">Address Verification</span>

        <div className="flex gap-3">
          <Input
            className="h-11"
            type="text"
            placeholder="Address Line 1"
            value={formData.addressline1}
            onChange={handleChange("addressline1")}
          />
          <Input
            className="h-11"
            type="text"
            placeholder="Address Line 2"
            value={formData.addressline2}
            onChange={handleChange("addressline2")}
          />
        </div>
        <Input
          className="h-11"
          type="text"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange("country")}
        />
        <Input
          className="h-11"
          type="text"
          placeholder="Zip Code"
          value={formData.zipCode}
          onChange={handleChange("zipCode")}
        />

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="controller"
        >
          <Button variant="secondary" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </form>
    </>
  );
};

export default AddressDetails;

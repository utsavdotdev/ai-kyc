import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const AddressDetails = ({ formData, handleChange, nextStep, prevStep }) => {
  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.address || !formData.zipCode) {
      toast.error("Please fill all the fields.");
      return;
    }
    nextStep();
  };
  return (
    <>
      <form className="form_container grid w-full max-w-md items-center gap-3">
        <span className="form_heading ">Address Verification</span>

        <Input
          className="h-11"
          type="text"
          placeholder="Permanent Address"
          value={formData.address}
          onChange={handleChange("address")}
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

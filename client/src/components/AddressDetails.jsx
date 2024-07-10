import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddressDetails = ({ formData, handleChange, nextStep, prevStep }) => {
  return (
    <>
      <div className="form_container grid w-full max-w-md items-center gap-3">
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
          <Button onClick={nextStep}>Next</Button>
        </div>
      </div>
    </>
  );
};

export default AddressDetails;

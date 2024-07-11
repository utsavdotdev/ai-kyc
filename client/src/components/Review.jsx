import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Review = ({ formData, prevStep }) => {
  const handleSubmit = () => {
    alert("Form submitted successfully!");
  };

  return (
    <>
      <div className="grid w-full max-w-md items-center gap-3">
        <span className="form_heading ">Review</span>
        <div className="flex gap-3">
          <div
            style={{
              width: "100%",
            }}
          >
            <Label htmlFor="fname">Email</Label>
            <Input
              id="fname"
              disabled
              className="h-11"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
            />
          </div>
          <div
            style={{
              width: "100%",
            }}
          >
            <Label htmlFor="lname">Last Name</Label>
            <Input
              disabled
              className="h-11"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              // onChange={handleChange("lastName")}
            />
          </div>
        </div>
        <Label htmlFor="email">Email</Label>
        <Input
          disabled
          id="email"
          className="h-11"
          type="email"
          placeholder="Email"
          value={formData.email}
          // onChange={handleChange("email")}
        />
        <Label htmlFor="dob">Date of Birth</Label>
        <input
          disabled
          // className="h-11"
          className="date_picker"
          type="date"
          placeholder="Date of Birth"
          value={formData.dob}
          // onChange={handleChange("dob")}
        />
        <Label htmlFor="phone">Phone</Label>
        <Input
          disabled
          className="h-11"
          type="number"
          placeholder="Your Number"
          value={formData.phone}
          // onChange={handleChange("phone")}
        />
        <Label htmlFor="address">Address</Label>
        <Input
          disabled
          className="h-11"
          type="text"
          placeholder="Address"
          value={formData.address}
          // onChange={handleChange("address")}
        />
        <Label htmlFor="zip">Zip Code</Label>
        <Input
          disabled
          className="h-11"
          type="number"
          placeholder="Zip Code"
          value={formData.zipCode}
          // onChange={handleChange("zipCode")}
        />
        <Label htmlFor="photo">Photo</Label>
        <img
          src={formData.photo}
          alt="photo"
          style={{
            width: "200px",
            height: "200px",
          }}
        />
        <Label htmlFor="passport">Passport</Label>
        <img
          src={formData.passport}
          alt="passport"
          style={{
            width: "100%",
            height: "auto",
          }}
        />

        <div
          style={{
            marginTop: "30px",
            paddingBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="controller"
        >
          <Button onClick={prevStep} variant="secondary">
            Back
          </Button>
          <Button>Submit</Button>
        </div>
      </div>
    </>
  );
};

export default Review;

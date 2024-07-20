import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "../config/axios.js";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Review = ({ formData, prevStep, images, id }) => {
  const [loading, setLoading] = useState(false);
  const [isDialog, setisDialog] = useState(false);
  const currentUrl = window.location.href;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formDataWithImages = new FormData();
      for (const key in formData) {
        formDataWithImages.append(key, formData[key]);
      }
      formDataWithImages.append("userId", id);
      formDataWithImages.append("link", currentUrl);

      const imageKeys = Object.keys(images);
      for (const key of imageKeys) {
        const blobUrl = images[key];
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const file = new File([blob], `${key}.jpg`, { type: blob.type });
        formDataWithImages.append(key, file);
      }

      const response = await axios.post("/submitkyc/post", formDataWithImages, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        setLoading(false);
        console.log(
          "KYC data received and saved successfully. Wait for Verification on Email."
        );
        toast.success(
          "KYC data received and saved successfully. Wait for Verification on Email."
        );
        console.log("Response:", response);
        setisDialog(true);
      }
    } catch (error) {
      console.error("Error submitting KYC data:", error);
      toast.error("Error submitting KYC data");
      setLoading(false);
    }
  };
  const handleDialog = () => {
    setisDialog(false);
    window.location.reload();
    window.location.replace("/");
    localStorage.removeItem("formData");
  };
  return (
    <>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>We recieved your Details for KYC ✅</DialogTitle>

            <DialogDescription style={{ paddingTop: "10px" }}>
              Your details have been submitted successfully. Please check your
              email at <b>{formData.email}</b> for updates on the status of your
              KYC verification.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter style={{ paddingTop: "5px" }}>
            <Button onClick={handleDialog}>Okay</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid w-full max-w-md items-center gap-3">
        <span className="form_heading ">Review</span>
        <div className="flex gap-3">
          <div
            style={{
              width: "100%",
            }}
          >
            <Label htmlFor="fname">First Name</Label>
            <Input
              id="fname"
              disabled
              className="h-11"
              type="text"
              placeholder="First Name"
              value={formData?.firstName}
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
              value={formData?.lastName}
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
          value={formData?.email}
        />
        <Label htmlFor="identificationNumber">Identification Number</Label>
        <Input
          disabled
          className="h-11"
          type="text"
          placeholder="Identification Number"
          value={formData?.identificationNumber}
          // onChange={handleChange("identificationNumber")}
        />
        <Label htmlFor="dob">Date Of birth</Label>

        <input
          disabled
          // className="h-11"
          className="date_picker"
          type="date"
          placeholder="Date of Birth"
          value={formData?.dob}
          // onChange={handleChange("dob")}
        />
        <Label htmlFor="phone">Phone</Label>
        <Input
          disabled
          className="h-11"
          type="number"
          placeholder="Your Number"
          value={formData?.phone}
          // onChange={handleChange("phone")}
        />
        <Label htmlFor="address">Address Line 1</Label>
        <Input
          disabled
          className="h-11"
          type="text"
          placeholder="Address"
          value={formData?.addressline1}
          // onChange={handleChange("address")}
        />
        <Label htmlFor="address">Address Line 2</Label>
        <Input
          disabled
          className="h-11"
          type="text"
          placeholder="Address"
          value={formData?.addressline2}
          // onChange={handleChange("address")}
        />
        <Label htmlFor="zip">Zip Code</Label>
        <Input
          disabled
          className="h-11"
          type="number"
          placeholder="Zip Code"
          value={formData?.zipCode}
          // onChange={handleChange("zipCode")}
        />
        <Label htmlFor="photo">Photo</Label>
        <img
          src={images?.face}
          alt="photo"
          style={{
            width: "200px",
            height: "200px",
          }}
        />
        <Label htmlFor="passport">Passport</Label>
        <img
          src={images?.passport}
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
          <Button
            disabled={loading ? true : false}
            onClick={prevStep}
            variant="secondary"
          >
            Back
          </Button>
          <Button disabled={loading ? true : false} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default Review;

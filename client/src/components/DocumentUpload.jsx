import React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TbPhotoPlus } from "react-icons/tb";

const DocumentUpload = ({ handleFileChange, nextStep, prevStep }) => {
  const onFileChange = (e) => {
    handleFileChange("passport")(e.target.files[0]);
  };
  console.log(handleFileChange);
  return (
    <>
      <div className="form_container grid w-full max-w-md items-center gap-3">
        <span className="form_heading ">Document Verification</span>
        <div className="dummy_box">
          <label htmlFor="passport" className="dummy_box_label">
            <span className="flex flex-col items-center justify-center h-screen gap-3">
              Click here to upload passport.
              <TbPhotoPlus size={30} />
            </span>
            <input
              type="file"
              id="passport"
              onChange={onFileChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
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

export default DocumentUpload;

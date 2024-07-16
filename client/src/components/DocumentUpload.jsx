import React from "react";
import { RxReset } from "react-icons/rx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TbPhotoPlus } from "react-icons/tb";
import toast from "react-hot-toast";

const DocumentUpload = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  setImages,
  images,
}) => {
  // only for passport change
  const onFileChange = (e) => {
    setImages({
      ...images,
      passport: URL.createObjectURL(e.target.files[0]),
    });
  };
  
  const clearPassport = () => {
    setImages({
      ...images,
      passport: null,
    });
  };

  const handleNext = (e) => {
    if (!images.passport) {
      toast.error("Please upload passport.");
      return;
    }
    nextStep();
  };
  return (
    <>
      <div className="form_container grid w-full max-w-md items-center gap-3">
        <div className="main_container">
          <span className="form_heading ">Document Verification</span>
          {images.passport && (
            <Button
              onClick={clearPassport}
              style={{
                borderRadius: "100vw",
              }}
              variant="secondary"
            >
              <RxReset size={25} />
            </Button>
          )}
        </div>

        {images.passport ? (
          <img src={images.passport} alt="img" style={{}} />
        ) : (
          <div className="dummy_box">
            <label htmlFor="passport" className="dummy_box_label">
              <span className="flex flex-col items-center justify-center  gap-3">
                Click here to upload passport.
                <TbPhotoPlus size={30} />
              </span>
              <input
                accept="image/*"
                type="file"
                id="passport"
                onChange={onFileChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
        )}
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "30px",
          }}
          className="controller"
        >
          <Button variant="secondary" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
    </>
  );
};

export default DocumentUpload;

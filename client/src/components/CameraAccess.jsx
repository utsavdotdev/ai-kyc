import React, { useRef, useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CameraAccess = ({
  handleChange,
  formData,
  handleFileChange,
  nextStep,
  prevStep,
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  console.log(capturedImage);
  console.log(stream);

  useEffect(() => {
    if (!capturedImage) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [capturedImage]);

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        "Failed to access camera. Please ensure you have given permission and your camera is working."
      );
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, 300, 200);
      canvasRef.current.toBlob((blob) => {
        handleFileChange("photo")(blob);
        setCapturedImage(URL.createObjectURL(blob));
        stopCamera();
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    // startCamera will be called by the useEffect hook
  };

  return (
    <>
      <div className="form_container grid w-full max-w-md items-center gap-3">
        <span className="form_heading ">Photo Verification</span>

        <div
          className="camera-container"
          style={{
            width: "300px",
            height: "200px",
            backgroundColor: "#333",
            margin: "0 auto",
            overflow: "hidden",
          }}
        >
          {!capturedImage ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <img
              src={capturedImage}
              alt="Captured"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width={300}
          height={200}
        />
        {!capturedImage ? (
          <button
            onClick={capturePhoto}
            style={{
              display: "block",
              margin: "10px auto",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Capture
          </button>
        ) : (
          <button
            onClick={retakePhoto}
            style={{
              display: "block",
              margin: "10px auto",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Retake
          </button>
        )}
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
          <Button
            style={{
              cursor:
                !capturedImage || error !== null ? "not-allowed" : "pointer",
            }}
            disabled={!capturedImage || error !== null ? true : false}
            onClick={nextStep}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default CameraAccess;

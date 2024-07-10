import React, { useRef, useState } from "react";

const CameraAccess = ({ formData, handleFileChange, nextStep, prevStep }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 50;
    canvas.height = 50;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0, 50, 50);
    canvas.toBlob((blob) => {
      handleFileChange("photo")(blob);
    });
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div className="form-step">
      <h2>Live Camera Access</h2>
      <button onClick={startCamera}>Access Camera</button>
      <div className="camera-container">
        <video
          ref={videoRef}
          autoPlay
          style={{ width: "50px", height: "50px" }}
        />
      </div>
      <button onClick={capturePhoto}>Capture</button>
      <div className="nav-buttons">
        <button
          className="back-btn"
          onClick={() => {
            stopCamera();
            prevStep();
          }}
        >
          Back
        </button>
        <button
          className="next-btn"
          onClick={() => {
            stopCamera();
            nextStep();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CameraAccess;

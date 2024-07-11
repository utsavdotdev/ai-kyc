import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CameraAccess = ({ setFormData, formData, nextStep, prevStep }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [capturedImage, setCapturedImage] = useState(formData.photo || null);

  useEffect(() => {
    if (!capturedImage && !stream) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [capturedImage, stream]);

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
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas dimensions to be square
      const size = Math.min(300, 200);
      canvas.width = size;
      canvas.height = size;

      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Create a circular clipping path
      context.beginPath();
      context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
      context.closePath();
      context.clip();

      // Calculate scaling and positioning to center the face
      const scale = size / Math.min(video.videoWidth, video.videoHeight);
      const x = (size - video.videoWidth * scale) / 2;
      const y = (size - video.videoHeight * scale) / 2;

      // Draw the video frame to the canvas, scaled and centered
      context.drawImage(
        video,
        x,
        y,
        video.videoWidth * scale,
        video.videoHeight * scale
      );

      canvas.toBlob((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setCapturedImage(imageUrl);
        setFormData({ ...formData, photo: imageUrl });
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
    setFormData({ ...formData, photo: null });
  };

  const handlePrev = () => {
    stopCamera();
    prevStep();
  };

  const handleNext = () => {
    if (capturedImage === null) {
      return;
    }
    nextStep();
  };

  return (
    <>
      <div className="form_container grid w-full max-w-md items-center gap-3">
        <span className="form_heading">Photo Verification</span>

        <div
          className="camera-container"
          style={{
            width: "300px",
            height: "200px",
            backgroundColor: "#333",
            margin: "0 auto",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {!capturedImage ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                    border: "2px solid white",
                    boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
                  }}
                />
              </div>
            </>
          ) : (
            <img
              src={capturedImage}
              alt="Captured"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
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
          <Button variant="secondary" onClick={handlePrev}>
            Back
          </Button>
          <Button
            disabled={!capturedImage || error !== null}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default CameraAccess;

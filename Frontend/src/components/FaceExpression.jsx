import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const FaceExpression = () => {
  const videoRef = useRef();
  const [expression, setExpression] = useState("");

  // 1️⃣ Load models
  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    console.log("✅ Models loaded");
  };

  // 2️⃣ Start webcam
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      videoRef.current.srcObject = stream;
      console.log("✅ Camera started");
    } catch (err) {
      console.error("❌ Camera error:", err);
    }
  };

  // 3️⃣ Detect expression only on button click
  const detectFace = async () => {
    if (!videoRef.current) return;

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    if (detections.length > 0) {
      const exp = detections[0].expressions;
      const maxExp = Object.keys(exp).reduce((a, b) =>
        exp[a] > exp[b] ? a : b
      );

      console.log("😃 Detected Expression:", maxExp);
      setExpression(maxExp);
    } else {
      console.log("⚠️ No face detected");
      setExpression("No face detected");
    }
  };

  // 🚀 Load models & start video when component mounts
  useEffect(() => {
    const init = async () => {
      await loadModels();
      await startVideo();
    };
    init();
  }, []);

  return (
    <div className="px-4  lg:mx-32 flex flex-col lg:flex-row justify-between items-center gap-8">
      <div className="flex flex-col items-center text-center lg:text-left">
        <video
          className="w-full max-w-md rounded-3xl shadow-lg"
          ref={videoRef}
          autoPlay
          muted
        />
        <h2 className="text-lg  font-bold mt-4">
          Current Expression: {expression || "Click Detect"}
        </h2>
      </div>

      {/* Right side: Text + Button */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Live Mood Detection
        </h1>
        <p className="text-sm md:text-base mb-4">
          Your current mood is being analyzed in real time. Enjoy music tailored
          to your feelings.
        </p>
        <button
          onClick={detectFace}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Detect Expression
        </button>
      </div>
    </div>
  );
};

export default FaceExpression;

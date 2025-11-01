import React, { useState } from "react";
import "./styles.css";

function ProgressBar({ progress }) {
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          width: "400px",
          height: "30px",
          backgroundColor: "#ddd",
          borderRadius: "5px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Progress Fill */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#007bff",
            borderRadius: "5px",
            transition: "width 0.3s",
          }}
        />

        {/* Progress Text */}
        <span
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            zIndex: 1,
          }}
        >
          {progress}%
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [progress, setProgress] = useState(0);

  function handleProgress(update) {
    if (update === "increase" && progress < 100) {
      setProgress((prev) => prev + 10);
    }
    if (update === "decrease" && progress > 0) {
      setProgress((prev) => prev - 10);
    }
  }

  return (
    <div className="App">
      <h1>Progress Bar</h1>
      <ProgressBar progress={progress} />
      <div>
        <button
          onClick={() => handleProgress("decrease")}
          disabled={progress === 0}
        >
          Decrease
        </button>
        <button
          onClick={() => handleProgress("increase")}
          disabled={progress === 100}
        >
          Increase
        </button>
      </div>
    </div>
  );
}

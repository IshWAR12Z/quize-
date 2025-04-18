import React, { useState } from "react";
import Particles from "./Particles";

const HomePage = ({ setUserName }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    setUserName(name);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { enable: false }, // Disable fullscreen so it stays within the div
          background: {
            color: "#000", // Background color
          },
          particles: {
            number: {
              value: 150, // Number of particles
            },
            color: {
              value: ["#ffffff", "#ff0000"], // Particle colors
            },
            size: {
              value: 3, // Particle size
            },
            move: {
              enable: true,
              speed: 0.5, // Speed of particles
            },
          },
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />

      {/* Main Content */}
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <header className="bg-primary text-white text-center p-4 mb-4">
          <h1>Quiz App</h1>
          <p>Test your knowledge!</p>
        </header>
        <div className="card p-4 shadow-sm">
          <h2>Enter Your Name</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Your Name"
          />
          <button onClick={handleSubmit} className="btn btn-primary mt-3">
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

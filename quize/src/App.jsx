import React, { useState } from "react";
import HomePage from "./HomePage";
import Quiz from "./Quiz";
import "bootstrap/dist/css/bootstrap.min.css";
import Particles from "./Particles";

const App = () => {
  const [userName, setUserName] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: "#000", // Background color
          },
          particles: {
            number: {
              value: 200, // Number of particles
            },
            color: {
              value: ["#ffffff", "#fff0021"], // Particle colors
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
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      />

      {/* Main Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {!userName ? (
          <HomePage setUserName={setUserName} />
        ) : (
          <Quiz userName={userName} setScore={setCorrectAnswers} />
        )}
      </div>
    </div>
  );
};

export default App;



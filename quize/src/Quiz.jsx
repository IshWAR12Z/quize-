import React, { useState, useEffect } from "react";
import { questions } from "./questions";
import Score from "./Score";
import "bootstrap/dist/css/bootstrap.min.css";

const Quiz = ({ userName, setScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [score, setQuizScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      if (timeLeft === 0) {
        handleNext();
      }

      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, isPaused]);

  const handleNext = () => {
    setAnswers((prev) => {
      const updatedAnswers = [...prev];
      if (!updatedAnswers[currentQuestion]) {
        updatedAnswers[currentQuestion] = { selectedOption: "Not Attempted", isCorrect: false };
      }
      return updatedAnswers;
    });

    if (selectedOption) {
      const isCorrect = selectedOption === questions[currentQuestion].answer;
      if (isCorrect) {
        setQuizScore((prevScore) => prevScore + 1);
      }
    }

    setSelectedOption("");
    setCurrentQuestion((prev) => prev + 1);
    setTimeLeft(30);
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => prev - 1);
    setSelectedOption(answers[currentQuestion - 1]?.selectedOption || "");
    setTimeLeft(30);
  };

  const handleAnswerChange = (option) => {
    setSelectedOption(option);
  };

  if (currentQuestion >= questions.length) {
    return <Score userName={userName} correctAnswers={score} answers={answers} />;
  }

  return (
    <div className="container mt-4">
      <header className="bg-primary text-white text-center p-3 rounded">
        <h1>Quiz App</h1>
        <p>Test your knowledge, {userName}!</p>
      </header>
      <div className="card p-4 shadow-lg mt-4">
        <h4>{questions[currentQuestion].question}</h4>
        <p className="text-danger">Time Left: {timeLeft} sec</p>
        <button className="btn btn-warning mb-2" onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? "Resume Timer" : "Pause Timer"}
        </button>
        <div className="list-group">
          {questions[currentQuestion].options.map((option, index) => (
            <label key={index} className="list-group-item">
              <input
                type="radio"
                name="options"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleAnswerChange(option)}
                className="form-check-input me-2"
              />
              {option}
            </label>
          ))}
        </div>

        <div className="mt-3 d-flex justify-content-between">
          <button
            className="btn btn-secondary"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={selectedOption === "" && timeLeft > 0}
          >
            Next
          </button>
        </div>

        <div className="mt-4">
          <h5>Jump to Question:</h5>
          {questions.map((_, index) => (
            <button
              key={index}
              className={`btn ${index === currentQuestion ? "btn-dark" : "btn-outline-secondary"} m-1`}
              onClick={() => {
                setCurrentQuestion(index);
                setTimeLeft(30);
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
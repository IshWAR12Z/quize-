import React from 'react';
import { jsPDF } from 'jspdf';
import { questions } from './questions';

const Score = ({ userName, correctAnswers, answers }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;

    doc.setFontSize(16);
    doc.text(`Quiz Completed - ${userName}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Your Score: ${correctAnswers}/${answers.length}`, 20, yPosition);
    yPosition += 10;
    doc.text(correctAnswers >= 7 ? 'Great Job!' : 'Better Luck Next Time!', 20, yPosition);
    yPosition += 10;

    doc.text('Your Answer Breakdown:', 20, yPosition);
    yPosition += 10;

    answers.forEach((answer, index) => {
      const questionText = `${index + 1}. ${questions[index].question}`;
      const userAnswer = `Answered: ${answer.selectedOption || 'Not Attempted'}`;
      const result = answer.selectedOption
        ? answer.isCorrect ? 'Correct' : 'Incorrect'
        : 'Not Attempted';
      const correctAnswerText = answer.selectedOption && !answer.isCorrect
        ? ` (Correct Answer: ${questions[index].answer})`
        : '';

      doc.text(`${questionText}`, 20, yPosition);
      yPosition += 8;
      doc.text(`${userAnswer} ${result}${correctAnswerText}`, 20, yPosition);
      yPosition += 12;
    });

    doc.save('quiz-results.pdf');
  };

  return (
    <div className="container">
      <header className="bg-primary text-white text-center p-4 mb-4">
        <h1>Quiz Completed</h1>
        <p>Thanks for participating, {userName}!</p>
      </header>
      <div className="card p-4 shadow-sm text-center">
        <h3>{`Congrats, ${userName}!`}</h3>
        <h4>Your Score: {correctAnswers}/{answers.length}</h4>
        <h5>{correctAnswers >= 7 ? 'Great Job!' : 'Better Luck Next Time!'}</h5>
        
        <h5 className="mt-3 mb-4">Correct Answers:</h5>
        <ul className="list-group">
          {answers.map((answer, index) => (
            answer.isCorrect && (
              <li key={index} className="list-group-item list-group-item-success">
                <strong>{questions[index].question}</strong>
                <br />
                Answered: <strong>{answer.selectedOption}</strong> (Correct)
              </li>
            )
          ))}
        </ul>

        <h5 className="mt-3 mb-4">Incorrect Answers:</h5>
        <ul className="list-group">
          {answers.map((answer, index) => (
            !answer.isCorrect && answer.selectedOption && (
              <li key={index} className="list-group-item list-group-item-danger">
                <strong>{questions[index].question}</strong>
                <br />
                Answered: <strong>{answer.selectedOption}</strong> (Incorrect)
                <div className="text-info mt-2">
                  <strong>Correct Answer:</strong> {questions[index].answer}
                </div>
              </li>
            )
          ))}
        </ul>

        <h5 className="mt-3 mb-4 text-warning">Not Attempted Questions:</h5>
        <ul className="list-group">
          {answers.map((answer, index) => (
            !answer.selectedOption && (
              <li key={index} className="list-group-item list-group-item-warning">
                <strong>{questions[index].question}</strong>
                <br />
                Answered: <strong>Not Attempted</strong>
              </li>
            )
          ))}
        </ul>

        <button className="btn btn-danger mt-3" onClick={downloadPDF}>
          Download PDF
        </button>
        <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Score;
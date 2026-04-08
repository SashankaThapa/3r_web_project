import { useState } from "react";

const questions = [
  {
    q: "What is Reduce?",
    options: ["Increase waste", "Minimize waste", "Destroy resources"],
    answer: "Minimize waste",
  },
];

function QuizCard() {
  const [score, setScore] = useState(0);

  const handleAnswer = (option, correct) => {
    if (option === correct) {
      setScore(score + 1);
    }
  };

  return (
    <div>
      <h2>Score: {score}</h2>

      {questions.map((item, index) => (
        <div key={index}>
          <p>{item.q}</p>
          {item.options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(opt, item.answer)}>
              {opt}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default QuizCard;
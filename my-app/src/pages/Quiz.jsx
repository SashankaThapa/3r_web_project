import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/quiz.css";

const quizSets = {
  set1: [
    {
      question: "What is the main goal of Reduce?",
      options: ["Increase consumption", "Minimize waste", "Destroy resources"],
      answer: "Minimize waste",
    },
    {
      question: "Which item should be reduced the most?",
      options: ["Plastic bags", "Trees", "Oxygen"],
      answer: "Plastic bags",
    },
    {
      question: "Reuse helps the environment by:",
      options: ["Increasing waste", "Extending product life", "Polluting water"],
      answer: "Extending product life",
    },
    {
      question: "Which is an example of Recycle?",
      options: ["Reusing bottles", "Turning paper into new paper", "Repairing shoes"],
      answer: "Turning paper into new paper",
    },
    {
      question: "Which material is recyclable?",
      options: ["Plastic", "Food waste", "Wet tissue"],
      answer: "Plastic",
    },
    {
      question: "Saving electricity supports which R?",
      options: ["Reduce", "Reuse", "Recycle"],
      answer: "Reduce",
    },
    {
      question: "Which action reduces water waste?",
      options: ["Leaving taps open", "Fixing leaks", "Washing roads"],
      answer: "Fixing leaks",
    },
    {
      question: "Which is the best 3R order?",
      options: [
        "Recycle → Reuse → Reduce",
        "Reduce → Reuse → Recycle",
        "Reuse → Reduce → Recycle",
      ],
      answer: "Reduce → Reuse → Recycle",
    },
    {
      question: "What happens if waste increases?",
      options: ["Pollution decreases", "Landfills grow", "Nature improves"],
      answer: "Landfills grow",
    },
    {
      question: "Which action supports all 3Rs?",
      options: ["Buying reusable items", "Burning plastic", "Throwing garbage"],
      answer: "Buying reusable items",
    },
  ],

  set2: [
    {
      question: "What does Recycle mean?",
      options: ["Throwing waste", "Making new products from waste", "Burning waste"],
      answer: "Making new products from waste",
    },
    {
      question: "Which bin is used for recyclable waste?",
      options: ["Green bin", "Blue bin", "Red bin"],
      answer: "Blue bin",
    },
    {
      question: "Which action saves trees?",
      options: ["Using more paper", "Recycling paper", "Burning books"],
      answer: "Recycling paper",
    },
    {
      question: "Which product is reusable?",
      options: ["Plastic spoon", "Cloth bag", "Paper plate"],
      answer: "Cloth bag",
    },
    {
      question: "Which is NOT recyclable?",
      options: ["Glass", "Metal", "Used tissue"],
      answer: "Used tissue",
    },
    {
      question: "Which habit supports Reuse?",
      options: ["Repairing items", "Throwing items", "Burning waste"],
      answer: "Repairing items",
    },
    {
      question: "Which gas increases due to waste?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen"],
      answer: "Carbon dioxide",
    },
    {
      question: "Composting is related to:",
      options: ["Recycle", "Reduce", "Reuse"],
      answer: "Recycle",
    },
    {
      question: "Which waste takes longest to decompose?",
      options: ["Plastic", "Paper", "Food waste"],
      answer: "Plastic",
    },
    {
      question: "Why should we follow 3R?",
      options: ["To increase waste", "To protect Earth", "To pollute environment"],
      answer: "To protect Earth",
    },
  ],
};

function Quiz() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedSet, setSelectedSet] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  // AUTH CHECK
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) return null;

  const questions = selectedSet ? quizSets[selectedSet] : [];

  const handleAnswer = (option) => {
    if (selected) return;

    setSelected(option);

    const updated = [...userAnswers];
    updated[currentQ] = option;
    setUserAnswers(updated);

    if (option === questions[currentQ].answer) {
      setScore((prev) => prev + 1);
    }
  };

  //  USER-SPECIFIC STORAGE FIX
  const saveResult = () => {
    const user = localStorage.getItem("user");
    const safeUser = user.replace(/\s/g, "_");
    const key = `quizHistory_${safeUser}`;

    const history = JSON.parse(localStorage.getItem(key)) || [];

    const attempt = {
      score: `${score}/${questions.length}`,
      date: new Date().toLocaleString(),
      answers: userAnswers,
      correctAnswers: questions.map((q) => q.answer),
      questions: questions.map((q) => q.question),
    };

    history.push(attempt);
    localStorage.setItem(key, JSON.stringify(history));
  };

  const nextQuestion = () => {
    setSelected(null);

    if (currentQ + 1 < questions.length) {
      setCurrentQ((prev) => prev + 1);
    } else {
      saveResult();
      setShowResult(true);
    }
  };

  // SELECT SET
  if (!selectedSet) {
    return (
      <div className="quiz-container">
        <h1>Select Quiz Set</h1>
        <div className="set-buttons">
          <button onClick={() => setSelectedSet("set1")}>SET 1</button>
          <button onClick={() => setSelectedSet("set2")}>SET 2</button>
        </div>
      </div>
    );
  }

  // RESULT
  if (showResult) {
    return (
      <div className="quiz-container">
        <h1>Your Score</h1>
        <h2>{score} / {questions.length}</h2>

        <div className="review">
          {questions.map((q, i) => (
            <div key={i} className="review-item">
              <p><strong>Q{i + 1}:</strong> {q.question}</p>

              <p>
                Your Answer:{" "}
                <span className={userAnswers[i] === q.answer ? "correct" : "wrong"}>
                  {userAnswers[i]}
                </span>
              </p>

              {userAnswers[i] !== q.answer && (
                <p className="correct">
                  Correct Answer: {q.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        <button onClick={() => {
          setSelectedSet(null);
          setScore(0);
          setCurrentQ(0);
          setShowResult(false);
          setUserAnswers([]);
        }}>
          Restart
        </button>
      </div>
    );
  }

  // QUIZ UI
  return (
    <motion.div
      className="quiz-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2>Question {currentQ + 1} / {questions.length}</h2>

      <motion.div
        key={currentQ}
        className="question-box"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <h3>{questions[currentQ].question}</h3>

        <div className="options">
          {questions[currentQ].options.map((opt, i) => (
            <button
              key={i}
              className={`option-btn 
                ${selected === opt ? "selected" : ""}
                ${selected && opt === questions[currentQ].answer ? "correct" : ""}
                ${selected && selected === opt && opt !== questions[currentQ].answer ? "wrong" : ""}
              `}
              onClick={() => handleAnswer(opt)}
              disabled={selected !== null}
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          className="next-btn"
          onClick={nextQuestion}
          disabled={!selected}
        >
          Next →
        </button>
      </motion.div>
    </motion.div>
  );
}

export default Quiz;  
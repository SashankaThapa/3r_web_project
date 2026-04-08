import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);

  // 🔒 AUTH + LOAD USER-SPECIFIC DATA
  useEffect(() => {
    const currentUser = localStorage.getItem("user");

    if (!currentUser) {
      navigate("/login");
      return;
    }

    setUser(currentUser);

    const safeUser = currentUser.replace(/\s/g, "_");
    const key = `quizHistory_${safeUser}`;

    const userHistory = JSON.parse(localStorage.getItem(key)) || [];
    setHistory(userHistory);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // prevent render before auth
  if (!user) return null;

  // 📊 STATS
  const totalAttempts = history.length;

  const bestScore =
    history.length > 0
      ? Math.max(
          ...history.map((h) =>
            parseInt(h.score.split("/")[0])
          )
        )
      : 0;

  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Welcome, {user} 👋</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stat-card">
          <h3>Total Attempts</h3>
          <p>{totalAttempts}</p>
        </div>

        <div className="stat-card">
          <h3>Best Score</h3>
          <p>{bestScore}</p>
        </div>
      </div>

      {/* HISTORY */}
      <div className="history">
        <h2>Quiz History</h2>

        {history.length === 0 ? (
          <p>No quiz attempts yet</p>
        ) : (
          <div className="attempts">
            {history.map((item, index) => (
              <div key={index} className="attempt-card">

                {/* HEADER */}
                <div
                  className="attempt-header"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <span>{item.date}</span>
                  <span className="score">{item.score}</span>
                </div>

                {/* DETAILS */}
                {openIndex === index && (
                  <div className="attempt-details">
                    {item.questions.map((q, i) => (
                      <div key={i} className="question-review">
                        <p><strong>Q{i + 1}:</strong> {q}</p>

                        <p>
                          Your Answer:{" "}
                          <span
                            className={
                              item.answers[i] === item.correctAnswers[i]
                                ? "correct"
                                : "wrong"
                            }
                          >
                            {item.answers[i]}
                          </span>
                        </p>

                        {item.answers[i] !== item.correctAnswers[i] && (
                          <p className="correct">
                            Correct: {item.correctAnswers[i]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
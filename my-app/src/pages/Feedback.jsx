import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/feedback.css";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!rating || !message) return alert("Please complete all fields");

    const feedback = {
      rating,
      message,
      date: new Date().toLocaleString(),
    };

    const existing =
      JSON.parse(localStorage.getItem("feedback")) || [];

    existing.push(feedback);
    localStorage.setItem("feedback", JSON.stringify(existing));

    setSubmitted(true);
  };

  return (
    <div className="feedback-page">

      {/* HERO */}
      <section className="hero">
        <motion.h1
          className="glow"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Feedback 🌿
        </motion.h1>

        <p>Help us improve your eco learning experience</p>
      </section>

      {/* CARD */}
      <motion.div
        className="feedback-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >

        {!submitted ? (
          <>
            {/* RATING */}
            <h3>Rate your experience</h3>

            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={
                    (hover || rating) >= star ? "star active" : "star"
                  }
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(null)}
                >
                  ⭐
                </span>
              ))}
            </div>

            {/* TEXTAREA */}
            <textarea
              placeholder="Share your thoughts..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSubmit}
              className="submit-btn"
            >
              Submit Feedback
            </motion.button>
          </>
        ) : (
          /* SUCCESS STATE */
          <motion.div
            className="success"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <div className="plant">🌱</div>
            <h2>Thank You!</h2>
            <p>Your feedback helps grow a greener future 🌍</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
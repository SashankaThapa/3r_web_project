import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../styles/reduce.css";

export default function ReducePage() {
  const parallaxRef = useRef(null);

  // ✅ FIX: ADD STATE
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="reduce-page">

      {/* HERO */}
      <section className="hero">
        <motion.h1
          className="glow"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          REDUCE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          The first and most powerful step in protecting our planet.
        </motion.p>
      </section>

      {/* PARALLAX */}
      <section className="parallax-section">
        <div ref={parallaxRef} className="floating-text">
          Less Waste = Better Future 🌍
        </div>
      </section>

      {/* THEORY */}
      <section className="theory">
        <motion.div className="theory-box" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2>What is Reduce?</h2>
          <p>
            Reduce means minimizing the amount of waste we generate by consuming fewer resources.
            It focuses on preventing waste before it is even created.
          </p>
        </motion.div>

        <motion.div className="theory-box" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2>Why is Reduce Important?</h2>
          <p>
            Reducing consumption conserves resources, reduces pollution, and helps fight climate change.
          </p>
        </motion.div>
      </section>

      {/* CARDS */}
      <section className="cards">
        {[
          {
            title: "Environmental Impact",
            text: "Reducing waste lowers pollution.",
          },
          {
            title: "Economic Benefits",
            text: "Less consumption saves money.",
          },
          {
            title: "Energy Conservation",
            text: "Fewer products = less energy usage.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="card"
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.div>
        ))}
      </section>

      {/* STEPS */}
      <section className="steps">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          How Can You Reduce?
        </motion.h2>

        <ul>
          <li>✔ Avoid single-use plastics</li>
          <li>✔ Buy only what you need</li>
          <li>✔ Save electricity and water</li>
        </ul>
      </section>

      {/* 🔥 FIXED INTERACTIVE SECTION */}
     <section className="interactive">

  {/* ANIMATION */}
  {showAnimation && (
    <motion.div
      className="reduce-animation"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "180px", opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      {/* shrinking waste */}
      <motion.div
        className="waste"
        initial={{ scale: 1 }}
        animate={{ scale: 0 }}
        transition={{ duration: 1.5 }}
      >
        🗑
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Reduce Waste → Save Earth 🌍
      </motion.h3>

    </motion.div>
  )}

  {/* BUTTON */}
  <motion.button
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.1 }}
    onClick={() => setShowAnimation(true)}
    className="cta-btn"
  >
    Start Reducing
  </motion.button>

</section>
      {/* CONCLUSION */}
      <section className="conclusion">
        <p>
          Small changes today create a sustainable future.
        </p>
      </section>

      <footer>
        <p>Reduce • Reuse • Recycle</p>
      </footer>

    </div>
  );
}
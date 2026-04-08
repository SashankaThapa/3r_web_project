import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../styles/recycle.css";

export default function RecyclePage() {
  const parallaxRef = useRef(null);

  // animation state
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
    <div className="recycle-page">

      {/* HERO */}
      <section className="hero">
        <motion.h1
          className="glow"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          RECYCLE
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Transform waste into valuable resources.
        </motion.p>
      </section>

      {/* PARALLAX */}
      <section className="parallax-section">
        <div ref={parallaxRef} className="floating-text">
          Waste → Resource ♻️
        </div>
      </section>

      {/* THEORY */}
      <section className="theory">
        <motion.div className="theory-box" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2>What is Recycling?</h2>
          <p>
            Recycling converts waste into new materials, reducing resource consumption and pollution.
          </p>
        </motion.div>

        <motion.div className="theory-box" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2>Why is Recycling Important?</h2>
          <p>
            It reduces landfill waste, conserves energy, and protects natural ecosystems.
          </p>
        </motion.div>
      </section>

      {/* CARDS */}
      <section className="cards">
        {[
          { title: "Less Pollution", text: "Reduces environmental damage." },
          { title: "Energy Saving", text: "Uses less energy than production." },
          { title: "Resource Protection", text: "Saves natural resources." },
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
          How Can You Recycle?
        </motion.h2>

        <ul>
          <li>✔ Separate waste properly</li>
          <li>✔ Use recycling bins</li>
          <li>✔ Avoid mixing wet/dry waste</li>
          <li>✔ Recycle paper, plastic, glass</li>
        </ul>
      </section>

      {/* INTERACTIVE */}
      <section className="interactive">

        {/* ANIMATION */}
        {showAnimation && (
          <motion.div
            className="recycle-animation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "200px", opacity: 1 }}
            transition={{ duration: 0.5 }}
          >

            <motion.div
              className="recycle-flow"
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.2, 1] }}
              transition={{ duration: 1 }}
            >
              <span>🗑</span>
              <span className="arrow">→</span>
              <span>⚙️</span>
              <span className="arrow">→</span>
              <span>🧱</span>
              <span className="arrow">→</span>
              <span>🌍</span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Recycle → Renew → Restore ♻️
            </motion.h3>

          </motion.div>
        )}

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setShowAnimation(true)}
          className="cta-btn"
        >
          Start Recycling
        </motion.button>

      </section>

      {/* CONCLUSION */}
      <section className="conclusion">
        <p>
          Recycling turns waste into opportunity and helps build a sustainable future.
        </p>
      </section>

      <footer>
        <p>Reduce • Reuse • Recycle</p>
      </footer>
    </div>
  );
}
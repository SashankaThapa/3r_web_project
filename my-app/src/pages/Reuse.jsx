import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../styles/reuse.css";

export default function ReusePage() {
  const parallaxRef = useRef(null);

  // ✅ animation state
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
    <div className="reuse-page">

      {/* HERO */}
      <section className="hero">
        <motion.h1
          className="glow"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          REUSE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Give products a second life and reduce waste.
        </motion.p>
      </section>

      {/* PARALLAX */}
      <section className="parallax-section">
        <div ref={parallaxRef} className="floating-text">
          Reuse Today = Sustain Tomorrow ♻️
        </div>
      </section>

      {/* THEORY */}
      <section className="theory">
        <motion.div
          className="theory-box"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2>What is Reuse?</h2>
          <p>
            Reuse means using items again instead of discarding them after a single use.
            It extends the life cycle of products and reduces the demand for new resources.
          </p>
        </motion.div>

        <motion.div
          className="theory-box"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2>Why is Reuse Important?</h2>
          <p>
            Reusing materials reduces waste generation, conserves natural resources, and minimizes
            energy consumption required for manufacturing new products.
          </p>
        </motion.div>
      </section>

      {/* CARDS */}
      <section className="cards">
        {[
          {
            title: "Waste Reduction",
            text: "Reusing products keeps them out of landfills.",
          },
          {
            title: "Cost Saving",
            text: "Using items multiple times saves money.",
          },
          {
            title: "Resource Conservation",
            text: "Less need for raw materials reduces environmental damage.",
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
          How Can You Reuse?
        </motion.h2>

        <ul>
          <li>✔ Use cloth bags instead of plastic</li>
          <li>✔ Reuse bottles and containers</li>
          <li>✔ Repair items instead of throwing them</li>
          <li>✔ Donate old clothes and books</li>
          <li>✔ Use refillable products</li>
        </ul>
      </section>

      {/* 🔥 INTERACTIVE (FIXED) */}
     <section className="interactive">

  {showAnimation && (
    <motion.div
      className="reuse-animation"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "180px", opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="reuse-icons"
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.2, 1] }}
        transition={{ duration: 1 }}
      >
        <span>🧴</span>
        <span className="arrow">→</span>
        <span>🔁</span>
        <span className="arrow">→</span>
        <span>🪴</span>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Reuse → Extend → Sustain ♻️
      </motion.h3>
    </motion.div>
  )}

  <motion.button
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.1 }}
    onClick={() => setShowAnimation(true)}
    className="cta-btn"
  >
    Start Reusing
  </motion.button>

</section>
      {/* CONCLUSION */}
      <section className="conclusion">
        <p>
          Reuse is a simple yet powerful habit. By extending the life of everyday items,
          we reduce waste and protect the environment for future generations.
        </p>
      </section>

      <footer>
        <p>Reduce • Reuse • Recycle</p>
      </footer>

    </div>
  );
}
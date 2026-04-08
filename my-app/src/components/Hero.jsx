import { motion } from "framer-motion";
import "../styles/hero.css";

function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero-text"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Save Earth</h1>
        <p>Reduce • Reuse • Recycle</p>
        <button>Start Learning</button>
      </motion.div>

      <motion.img
        src="/earth.png"
        alt="earth"
        className="hero-img"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
    </section>
  );
}

export default Hero;
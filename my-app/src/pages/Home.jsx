import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // hook example
  // scroll control
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;

      const index = Math.min(3, Math.floor(scrollY / height));
      setStep(index);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // DATA for each "screen"
  const sections = [
    {
      title: "Save Our Planet",
      subtitle: "Reduce • Reuse • Recycle",
      type: "hero",
    },
    {
      title: "Reduce 🚫",
      subtitle: "💡 Less waste = Better future",
      items: [
        "🛍 Use cloth bags",
        "🥤 Avoid plastic",
        "⚡ Save electricity",
        "📦 Less packaging",
        "🍽 Eat wisely",
        "📱 Go digital",
      ],
      route: "/reduce",
    },
    {
      title: "Reuse 🔁",
      subtitle: "♻️ Reuse saves resources",
      items: [
        "🧴 Reuse bottles",
        "👕 Donate clothes",
        "🛠 Repair items",
        "🎁 Reuse wraps",
        "📦 Use boxes",
        "🪑 Upcycle",
      ],
      route: "/reuse",
    },
    {
      title: "Recycle ♻️",
      subtitle: "🌱 Turn waste into value",
      items: [
        "🗑 Sort waste",
        "📄 Recycle paper",
        "🥫 Metal reuse",
        "🧴 Plastic recycle",
        "🏭 Processing",
        "🌍 Save Earth",
      ],
      route: "/recycle",
    },
  ];

  const current = sections[step];

  return (
    <div className="home">

      {/* ONE FIXED SCREEN */}
      <div className="fixed-screen">

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className="content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >

            {/* HERO */}
            {current.type === "hero" ? (
              <>
                <h1>{current.title}</h1>
                <p>{current.subtitle}</p>

                <button id="startLearning" onClick={() => navigate("/quiz")}>
                  Start Learning
                </button>

                <motion.img
                  src="/earth.png"
                  className="hero-img"
                  animate={{ y: [0, -20, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                  }}
                />
              </>
            ) : (
              <>
                <h2>{current.title}</h2>

                <div className="fun-grid">
                  {current.items.map((item, i) => (
                    <div key={i} className="fun-card">
                      {item}
                    </div>
                  ))}
                </div>

                <p className="impact">{current.subtitle}</p>

                <button
                  className="learn-btn"
                  onClick={() => navigate(current.route)}
                >
                  Learn More →
                </button>
              </>
            )}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* SCROLL SPACE */}
      <div className="scroll-space" />

    </div>
  );
}

export default Home;
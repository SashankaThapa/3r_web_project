import { motion } from "framer-motion";
import "../styles/contact.css";

export default function Contact() {
  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <motion.h1
          className="glow"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Contact Us 🌍
        </motion.h1>

        <p>We’d love to hear from you</p>
      </section>

      {/* CONTENT */}
      <section className="contact-container">

        {/* LEFT SIDE */}
        <div className="contact-info">

          <motion.div whileHover={{ scale: 1.05 }} className="info-card">
            📍 <h3>Location</h3>
            <p>VIT University, Vellore</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="info-card">
            📧 <h3>Email</h3>
            <p>greenearth@eco.com</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="info-card">
            📞 <h3>Phone</h3>
            <p>+91 98765 43210</p>
          </motion.div>

        </div>

        {/* RIGHT SIDE */}
        <div className="contact-form">
          <h2>Send a Message</h2>

          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Send Message
          </motion.button>
        </div>

      </section>

      {/* MAP */}
      <section className="map-section">

        <motion.div
          className="map-container"
          whileHover={{ scale: 1.03 }}
        >
          <iframe
            src="https://www.google.com/maps?q=VIT%20Vellore&output=embed"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </motion.div>

      </section>

    </div>
  );
}
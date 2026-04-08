import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <h2>🌍 GreenEarth</h2>
          <p>Small actions. Big impact.</p>
        </div>

        <div className="footer-links">
          <a href="#reduce">Reduce</a>
          <a href="#reuse">Reuse</a>
          <a href="#recycle">Recycle</a>
        </div>

        <div className="footer-socials">
          <span>🌱</span>
          <span>♻️</span>
          <span>🌎</span>
        </div>

      </div>

      <p className="footer-bottom">
        © 2026 GreenEarth | Designed with 💚
      </p>
    </footer>
  );
}

export default Footer;
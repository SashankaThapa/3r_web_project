import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  //  FIXED AUTH (matches your login system)
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  //  check if home page
  const isHome = location.pathname === "/";

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    navigate("/login");
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* LOGO */}
      <h2 className="logo">GreenEarth</h2>

      {/* MENU ICON */}
      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* NAV LINKS */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>

        <li>
          <Link
            to="/"
            onClick={handleLinkClick}
            className={location.pathname === "/" ? "active" : ""}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/quiz"
            onClick={handleLinkClick}
            className={location.pathname === "/quiz" ? "active" : ""}
          >
            Quiz
          </Link>
        </li>

        <li>
          <Link
            to="/reduce"
            onClick={handleLinkClick}
            className={location.pathname === "/reduce" ? "active" : ""}
          >
            Reduce
          </Link>
        </li>

        <li>
          <Link
            to="/reuse"
            onClick={handleLinkClick}
            className={location.pathname === "/reuse" ? "active" : ""}
          >
            Reuse
          </Link>
        </li>

        <li>
          <Link
            to="/recycle"
            onClick={handleLinkClick}
            className={location.pathname === "/recycle" ? "active" : ""}
          >
            Recycle
          </Link>
        </li>

        {/* ✅ FEEDBACK (ONLY ON HOME) */}
        {isHome && (
          <li>
            <Link
              to="/feedback"
              onClick={handleLinkClick}
              className={location.pathname === "/feedback" ? "active" : ""}
            >
              Feedback
            </Link>
          </li>
        )}

        {/* ✅ CONTACT (ALWAYS VISIBLE) */}
        <li>
          <Link
            to="/contact"
            onClick={handleLinkClick}
            className={location.pathname === "/contact" ? "active" : ""}
          >
            Contact Us
          </Link>
        </li>

        {/* 🔥 PROFILE DROPDOWN */}
        <li className="profile">
          <div className="profile-icon">👤</div>

          <div className="dropdown">
            {currentUser ? (
              <>
                <p className="username">
                  Hi, {currentUser.name}
                </p>

                <Link to="/dashboard" onClick={handleLinkClick}>
                  Dashboard
                </Link>

                <span onClick={handleLogout}>Logout</span>
              </>
            ) : (
              <>
                <Link to="/login" onClick={handleLinkClick}>
                  Sign In
                </Link>

                <Link to="/signup" onClick={handleLinkClick}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </li>

      </ul>
    </motion.nav>
  );
}

export default Navbar;
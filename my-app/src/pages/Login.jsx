import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = () => {
    const { email, password } = form;

    if (!email || !password) {
      return setError("All fields are required");
    }

    // GET STORED DATA (from your signup)
    const storedName = localStorage.getItem("user");
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    // no account exists
    if (!storedEmail || !storedPassword) {
      return setError("No account found. Please sign up.");
    }

    // wrong credentials
    if (email !== storedEmail || password !== storedPassword) {
      return setError("Invalid email or password");
    }

    // SUCCESS LOGIN
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: storedName,
        email: storedEmail,
      })
    );

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back 👋</h1>
        <p className="subtitle">Login to continue your eco journey</p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* ERROR */}
        {error && <p className="error">{error}</p>}

        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="link"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
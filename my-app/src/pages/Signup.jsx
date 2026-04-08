import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Name is required";

    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Invalid email format";
    }

    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must be 8+ chars, include uppercase, lowercase, number & special character";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // STORE FULL USER DATA (IMPORTANT FIX)
    localStorage.setItem("user", form.name);
    localStorage.setItem("email", form.email);
    localStorage.setItem("password", form.password);

    alert("Account created successfully");

    navigate("/login"); // go to login instead of dashboard
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <span className="error">{errors.name}</span>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <span className="error">{errors.email}</span>

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <span className="error">{errors.password}</span>

        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({
              ...form,
              confirmPassword: e.target.value,
            })
          }
        />
        <span className="error">{errors.confirmPassword}</span>

        <button onClick={handleSubmit}>Sign Up</button>

        <p>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="link"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
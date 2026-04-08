import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// PAGES
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Reduce from "./pages/Reduce";
import Reuse from "./pages/Reuse";
import Recycle from "./pages/Recycle";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import Contact from "./pages/Contact";

// COMPONENTS
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* PROTECTED ROUTE */
function ProtectedRoute({ children }) {
  const user = localStorage.getItem("currentUser");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

/* ANIMATED ROUTES */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/reduce" element={<Reduce />} />
        <Route path="/reuse" element={<Reuse />} />
        <Route path="/recycle" element={<Recycle />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED */}
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* FEEDBACK (optional protected or public) */}
        <Route path="/feedback" element={<Feedback />} />
         <Route path="/contact" element={<Contact />} />


        {/*  FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </AnimatePresence>
  );
}

/*MAIN APP */
function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
}

export default App;
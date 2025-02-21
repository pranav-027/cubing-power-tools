import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TimeTracker from "./TimeTracker";
import "./styles.css";

function HomePage() {
  return (
    <div className="container">
      <div className="home-box">
        <h1>Power Tools</h1>
        <p>Welcome to Power Tools! Click below to go to the Time Tracker.</p>
        <Link to="/timetracker" className="button">Go to Time Tracker</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router basename="/power-tools">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timetracker" element={<TimeTracker />} />
      </Routes>
    </Router>
  );
}

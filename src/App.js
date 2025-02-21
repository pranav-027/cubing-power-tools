import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TimeTracker from "./TimeTracker";

function App() {
  return (
    <Router basename="/power-tools">
      <Routes>
        <Route path="/" element={<TimeTracker />} />
      </Routes>
    </Router>
  );
}

export default App;

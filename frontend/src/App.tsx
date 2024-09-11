import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Payment from "./pages/Payment";

function App() {
  return (
    <Router>
      <Payment />
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PasswordGenerator from "./components/PasswordGenrator";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <video id="background-video" autoPlay loop muted playsInline>
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <div id="video-overlay"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
        <div className="space-x-4 mb-6">
          <Link to="/" id="home-btn">Home</Link>
          <Link to="/stored" id="stored-btn">Stored</Link>
        </div>

        <h1 id="heading">🔐 Password Vault</h1>

        <div className="w-full max-w-md">
          <Routes>
            <Route path="/" element={<PasswordGenerator view="generate" />} />
            <Route path="/stored" element={<PasswordGenerator view="stored" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

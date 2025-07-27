import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PasswordGenerator from "./components/PasswordGenrator";
import "./App.css";


const Stored = () => <div>Stored Passwords Page</div>;

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="space-x-4">
          <Link
            to="/"
            id="home-btn"
            className="px-4 py-2 rounded hover:bg-gray-700 bg-black text-white"
          >
            Home
          </Link>
          <Link
            to="/stored"
            id="stored-btn"
            className="px-4 py-2 rounded hover:bg-gray-700 bg-black text-white"
          >
            Stored
          </Link>
        </div>
        <nav className="bg-gray-900 px-6 py-4 shadow-md flex justify-between items-center">
          <h1 className="text-xl font-bold" id="heading">🔐 Password Vault</h1>
        </nav>
        <main className="p-6">
          <Routes>
            <Route path="/" element={<PasswordGenerator view="generate" />} />
            <Route path="/stored" element={<Stored />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
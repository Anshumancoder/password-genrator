import React, { useState, useEffect } from "react";
import "./Password.css";

interface Props {
  view: "generate" | "stored";
}

const generatePassword = (length = 12): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

const PasswordGenerator: React.FC<Props> = ({ view }) => {
  const [passwords, setPasswords] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState<string>("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("passwords") || "[]");
    setPasswords(stored);
  }, []);

  const handleGenerate = () => {
    const pwd = generatePassword();
    setNewPassword(pwd);
  };

  const handleSave = () => {
    if (!newPassword) return;
    const updated = [...passwords, newPassword];
    setPasswords(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
    setNewPassword("");
  };

  if (view === "generate") {
    return (
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl max-w-md mx-auto text-center">
        <button
          id="generate-btn"
          onClick={handleGenerate}
          className="bg-indigo-500 px-4 py-2 rounded text-white mb-4 hover:bg-indigo-600"
        >
          Generate Password
        </button>

        <p className="mb-4 text-xl font-mono break-all">{newPassword}</p>

        <button
          onClick={handleSave}
          className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
        >
          Save Password
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-xl max-w-md mx-auto">
      <h2 id='your-password' className="text-lg font-bold mb-4 text-center">Your Passwords</h2>
      {passwords.length === 0 ? (
        <p className="text-gray-400 text-center">No passwords saved yet.</p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {passwords.map((pwd, idx) => (
            <div
              key={idx}
              className="bg-gray-700 p-2 rounded font-mono text-sm break-all"
            >
              {pwd}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
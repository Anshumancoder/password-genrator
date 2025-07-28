import React, { useState, useEffect } from "react";
import './Password.css';

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
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("passwords") || "[]");
    setPasswords(stored);
  }, []);

  const handleGenerate = () => {
    const pwd = generatePassword();
    setNewPassword(pwd);
    setCopied(false);
  };

  const handleSave = () => {
    if (!newPassword) return;
    const updated = [...passwords, newPassword];
    setPasswords(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
    setNewPassword("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(newPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (view === "generate") {
    return (
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl max-w-md mx-auto text-center space-y-4">
        <div className="relative flex items-center justify-center">
          <input
            type="text"
            value={newPassword}
            readOnly
            className="w-full p-2 pr-10 rounded bg-gray-800 text-white font-mono border border-gray-700"
            placeholder="Generated password will appear here"
            id="password-input"
          />
          {newPassword && (
            <button
              onClick={handleCopy}
              className="absolute right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full text-sm"
              title="Copy to clipboard"
              id="copy-btn"
            >
                Copy
            </button>
          )}
        </div>

        {copied && <p className="text-green-400 text-sm">Password copied to clipboard!</p>}

        <button
          onClick={handleGenerate}
          className="generate-btn"
          id="generate-btn"
        >
          <span>Generate Password</span>
        </button>

        <button
          onClick={handleSave}
          className="generate-btn"
          id="save-btn"
        >
          <span>Save Password</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-xl max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4 text-center">Stored Passwords</h2>
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

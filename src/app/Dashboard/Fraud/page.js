"use client";

import React, { useState, useEffect } from "react";

const FraudPage = () => {
  const [userId, setUserId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [fraudAlerts, setFraudAlerts] = useState([]);

  // Load transaction data from the JSON file
  useEffect(() => {
    fetch("/raw_transaction_data.json")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => console.error("Error loading transactions:", error));
  }, []);

  // Fraud detection logic
  const detectFraud = (transactions) => {
    const alerts = [];

    transactions.forEach((tx) => {
      const reasons = [];

      // Rule 1: Detect unusual locations
      const commonLocations = ["Kolkata", "Mumbai", "Delhi", "Bangalore", "Chennai"];
      if (!commonLocations.includes(tx.transaction_location)) {
        reasons.push("Unusual Location");
      }

      // Rule 2: Detect high-value transactions (e.g., above ₹50,000)
      if (tx.amount_spent > 50000) {
        reasons.push("Unusual Amount");
      }

      // Rule 3: Detect unusual times (e.g., late-night transactions)
      const transactionTime = new Date(tx.date).getHours();
      if (transactionTime < 6 || transactionTime > 22) {
        reasons.push("Unusual Time");
      }

      if (reasons.length > 0) {
        alerts.push({
          ...tx,
          fraudulent: true,
          reasons: reasons,
        });
      }
    });

    return alerts;
  };

  // Handle fetching data for the entered user ID
  const handleFetchData = () => {
    const userTransactions = transactions.filter((tx) => tx.user_id === parseInt(userId));
    setFraudAlerts(detectFraud(userTransactions));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-teal-800 mb-6">Fraud Detection System</h1>

        {/* User ID Input */}
        <div className="mb-8">
          <label htmlFor="userId" className="block text-sm font-medium text-teal-700">
            Enter User ID:
          </label>
          <div className="mt-1 flex gap-2">
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="flex-1 p-2 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-black"
              placeholder="Enter user ID"
            />
            <button
              onClick={handleFetchData}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Fetch Data
            </button>
          </div>
        </div>

        {/* Fraud Alerts Section */}
        <div>
          <h2 className="text-xl font-semibold text-teal-700 mb-4">Potential Fraud Alerts</h2>
          {fraudAlerts.length > 0 ? (
            <ul className="space-y-3">
              {fraudAlerts.map((alert, index) => (
                <li
                  key={index}
                  className="p-4 border border-red-200 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <p className="text-red-700">
                    🚨 <strong>Transaction ID:</strong> {alert.transaction_id}
                  </p>
                  <p className="text-red-700">
                    <strong>Amount:</strong> ₹{alert.amount_spent}
                  </p>
                  <p className="text-red-700">
                    <strong>Location:</strong> {alert.transaction_location}
                  </p>
                  <p className="text-red-700">
                    <strong>Reasons:</strong> {alert.reasons.join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-teal-600">No suspicious activity detected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FraudPage;
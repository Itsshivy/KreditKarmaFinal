"use client";

import React, { useEffect, useState } from "react";

// Fraud detection logic
const detectFraud = (transactions) => {
  const alerts = [];

  transactions.forEach((tx) => {
    // Rule 1: Detect high-value transactions (e.g., above ₹50,000)
    if (tx.amount > 50000) {
      alerts.push({
        description: `High-value transaction detected: ₹${tx.amount} by ${tx.user}`,
      });
    }

    // Rule 2: Detect transactions from unusual locations (e.g., not in a predefined list of common locations)
    const commonLocations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"];
    if (!commonLocations.includes(tx.transaction_location)) {
      alerts.push({
        description: `Unusual transaction location detected: ${tx.transaction_location} for transaction by ${tx.user}`,
      });
    }

    // Rule 3: Detect transactions with future timestamps (potential data tampering)
    const currentDate = new Date();
    const transactionDate = new Date(tx.timestamp);
    if (transactionDate > currentDate) {
      alerts.push({
        description: `Future timestamp detected: ${tx.timestamp} for transaction by ${tx.user}`,
      });
    }
  });

  return alerts;
};

const Page = () => {
  const [transactions, setTransactions] = useState([]);
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [userId, setUserId] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetch("/raw_transaction_data.json")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => console.error("Error loading transactions:", error));
  }, []);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleFetchData = () => {
    const filtered = transactions.filter((tx) =>
      tx.user.toLowerCase().includes(userId.toLowerCase())
    );
    setFilteredTransactions(filtered);
    setFraudAlerts(detectFraud(filtered));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-teal-800 mb-6">Fraud Detection System</h1>

        {/* User ID Input */}
        <div className="mb-8">
          <label htmlFor="userId" className="block text-sm font-medium text-teal-700">
            Enter User Name:
          </label>
          <div className="mt-1 flex gap-2">
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={handleUserIdChange}
              className="flex-1 p-2 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter user name"
            />
            <button
              onClick={handleFetchData}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Fetch Data
            </button>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-teal-700 mb-4">Transactions</h2>
          {filteredTransactions.length > 0 ? (
            <ul className="space-y-3">
              {filteredTransactions.map((tx) => (
                <li
                  key={tx.id}
                  className="p-4 border border-teal-200 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-teal-900 font-medium">{tx.user}</p>
                      <p className="text-sm text-teal-600">
                        ₹{tx.amount.toLocaleString()} • {tx.transaction_location}
                      </p>
                    </div>
                    <p className="text-sm text-teal-500">
                      {new Date(tx.timestamp).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-teal-600">No transactions found for this user.</p>
          )}
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
                  <p className="text-red-700">🚨 {alert.description}</p>
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

export default Page;
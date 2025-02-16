// pages/index.js
"use client"
import { useEffect, useState } from 'react';

export default function Home() {
  const [fraudulentTransactions, setFraudulentTransactions] = useState([]);

  useEffect(() => {
    // Fetch fraudulent transactions from the API
    fetch('/api/detect-fraud')
      .then((response) => response.json())
      .then((data) => setFraudulentTransactions(data.fraudulentTransactions))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Fraudulent Transactions</h1>
      {fraudulentTransactions.length > 0 ? (
        <ul>
          {fraudulentTransactions.map((transaction) => (
            <li key={transaction.transaction_id}>
              <p>Transaction ID: {transaction.transaction_id}</p>
              <p>User ID: {transaction.user_id}</p>
              <p>Amount: {transaction.transaction_amount}</p>
              <p>CVV Attempts: {transaction.cvv_attempts}</p>
              <p>Declined Transactions: {transaction.declined_transactions}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No fraudulent transactions detected.</p>
      )}
    </div>
  );
}
"use client"
import React, { useState, useEffect } from 'react';

const CreditScoreProtection = () => {
  // Mock data with Indian banks and INR values
  const mockBanks = [
    {
      id: 1,
      name: 'State Bank of India',
      balance: 500000,
      limit: 1000000,
      transactions: [
        { id: 1, category: 'Food', amount: 5000 },
        { id: 2, category: 'Transport', amount: 3000 },
        { id: 3, category: 'Entertainment', amount: 10000 },
      ],
    },
    {
      id: 2,
      name: 'HDFC Bank',
      balance: 300000,
      limit: 800000,
      transactions: [
        { id: 1, category: 'Shopping', amount: 15000 },
        { id: 2, category: 'Utilities', amount: 7000 },
        { id: 3, category: 'Travel', amount: 20000 },
      ],
    },
    {
      id: 3,
      name: 'ICICI Bank',
      balance: 700000,
      limit: 1500000,
      transactions: [
        { id: 1, category: 'Food', amount: 8000 },
        { id: 2, category: 'Health', amount: 12000 },
        { id: 3, category: 'Entertainment', amount: 15000 },
      ],
    },
    {
      id: 4,
      name: 'Axis Bank',
      balance: 400000,
      limit: 900000,
      transactions: [
        { id: 1, category: 'Transport', amount: 5000 },
        { id: 2, category: 'Shopping', amount: 10000 },
        { id: 3, category: 'Utilities', amount: 6000 },
      ],
    },
    {
      id: 5,
      name: 'Punjab National Bank',
      balance: 600000,
      limit: 1200000,
      transactions: [
        { id: 1, category: 'Food', amount: 7000 },
        { id: 2, category: 'Travel', amount: 25000 },
        { id: 3, category: 'Health', amount: 9000 },
      ],
    },
  ];

  // State for selected bank, linked accounts, loading states, and data
  const [selectedBank, setSelectedBank] = useState('');
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [creditUtilization, setCreditUtilization] = useState(0);
  const [progress, setProgress] = useState(0); // For progress bar
  const [notifications, setNotifications] = useState([]); // For notifications

  // Add a notification
  const addNotification = (message, type = 'info') => {
    const newNotification = {
      id: Date.now(), // Unique ID for the notification
      message,
      type, // 'info', 'warning', or 'success'
    };
    setNotifications((prev) => [newNotification, ...prev]);

    // Play notification sound
    const audio = new Audio('/sounds/notification.mp3');
    audio.play().catch((error) => {
      console.error('Failed to play audio:', error);
    });

    // Automatically remove the notification after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id));
    }, 5000);
  };

  // Simulate API call to link a bank account
  const handleLinkAccount = () => {
    if (!selectedBank) {
      alert('Please select a bank to link.');
      return;
    }

    setIsLoading(true);
    setProgress(0);

    // Simulate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      const bank = mockBanks.find((b) => b.id === parseInt(selectedBank));
      if (bank) {
        setLinkedAccounts([...linkedAccounts, bank]);
        addNotification(`${bank.name} linked successfully!`, 'success');
      }
      setIsLoading(false);
      setSelectedBank(''); // Reset dropdown
      clearInterval(interval);
    }, 2000); // Simulate 2-second delay
  };

  // Simulate API call to fetch transactions for a specific bank
  const fetchTransactions = (bankId) => {
    setIsLoading(true);
    setTimeout(() => {
      const bank = mockBanks.find((b) => b.id === bankId);
      if (bank) {
        setTransactions(bank.transactions);

        // Simulate a large transaction alert
        const largeTransaction = bank.transactions.find((t) => t.amount > 15000);
        if (largeTransaction) {
          addNotification(`Large transaction detected: ₹${largeTransaction.amount} (${largeTransaction.category})`, 'warning');
        }
      }
      setIsLoading(false);
    }, 1000); // Simulate 1-second delay
  };

  // Calculate credit utilization
  useEffect(() => {
    let totalBalance = 0;
    let totalLimit = 0;

    linkedAccounts.forEach((account) => {
      totalBalance += account.balance;
      totalLimit += account.limit;
    });

    const utilization = totalLimit > 0 ? (totalBalance / totalLimit) * 100 : 0;
    setCreditUtilization(utilization.toFixed(2));

    // Simulate credit utilization alert
    if (utilization > 30) {
      addNotification(`Credit utilization is ${utilization.toFixed(2)}%, which is above the recommended 30%.`, 'warning');
    }
  }, [linkedAccounts]);

  // Bar chart for spending insights
  const SpendingBarChart = () => {
    const spendingByCategory = getSpendingInsights();
    const maxAmount = Math.max(...Object.values(spendingByCategory), 0);

    return (
      <div className="space-y-3">
        {Object.entries(spendingByCategory).map(([category, amount]) => (
          <div key={category} className="flex items-center">
            <div className="w-24 text-teal-800 font-medium">{category}</div>
            <div className="flex-1 bg-teal-100 rounded-full h-4">
              <div
                className="bg-teal-500 h-4 rounded-full"
                style={{ width: `${(amount / maxAmount) * 100}%` }}
              ></div>
            </div>
            <div className="w-20 text-right text-teal-800">₹{amount.toLocaleString()}</div>
          </div>
        ))}
      </div>
    );
  };

  // Get spending insights
  const getSpendingInsights = () => {
    const spendingByCategory = {};

    transactions.forEach((transaction) => {
      if (spendingByCategory[transaction.category]) {
        spendingByCategory[transaction.category] += transaction.amount;
      } else {
        spendingByCategory[transaction.category] = transaction.amount;
      }
    });

    return spendingByCategory;
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-teal-50 to-white min-h-screen">
      {/* Notification Panel */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg ${
              notification.type === 'warning'
                ? 'bg-orange-100 border-l-4 border-orange-500 text-orange-800'
                : notification.type === 'success'
                ? 'bg-green-100 border-l-4 border-green-500 text-green-800'
                : 'bg-blue-100 border-l-4 border-blue-500 text-blue-800'
            }`}
          >
            {notification.message}
          </div>
        ))}
      </div>

      <h1 className="text-4xl font-bold mb-6 text-teal-800 text-center">Credit Score Protection</h1>

      {/* Link Bank Account Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-lg border border-teal-100">
        <h2 className="text-2xl font-semibold mb-4 text-teal-700">Link Bank Account</h2>
        <div className="flex space-x-2">
        <select
  value={selectedBank}
  onChange={(e) => setSelectedBank(e.target.value)}
  className="border border-teal-300 p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
>
  <option value="" className="text-black">Select a bank</option>
  {mockBanks.map((bank) => (
    <option key={bank.id} value={bank.id} className="text-black">
      {bank.name}
    </option>
  ))}
</select>
          <button
            onClick={handleLinkAccount}
            disabled={isLoading || !selectedBank}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 disabled:bg-teal-300 transition-all duration-300"
          >
            {isLoading ? 'Linking...' : 'Link Account'}
          </button>
        </div>
        {isLoading && (
          <div className="mt-4">
            <div className="w-full bg-teal-100 rounded-full h-2.5">
              <div
                className="bg-teal-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Linked Accounts Section */}
      {linkedAccounts.length > 0 && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-lg border border-teal-100">
          <h2 className="text-2xl font-semibold mb-4 text-teal-700">Linked Accounts</h2>
          <ul className="space-y-2">
            {linkedAccounts.map((account) => (
              <li key={account.id} className="text-teal-800">
                <span className="font-medium">{account.name}</span>: Balance ₹{account.balance.toLocaleString()}, Limit ₹{account.limit.toLocaleString()}
                <button
                  onClick={() => fetchTransactions(account.id)}
                  disabled={isLoading}
                  className="bg-teal-500 text-white px-2 py-1 rounded ml-2 hover:bg-teal-600 disabled:bg-teal-300 transition-all duration-300"
                >
                  {isLoading ? 'Fetching...' : 'Fetch Transactions'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Credit Utilization Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-lg border border-teal-100">
        <h2 className="text-2xl font-semibold mb-4 text-teal-700">Credit Utilization</h2>
        <p className="text-teal-800">
          Your current credit utilization is:{' '}
          <strong className="text-teal-600">{creditUtilization}%</strong>
        </p>
        <button
          onClick={() => addNotification(`Credit utilization is ${creditUtilization}%.`, 'info')}
          className="bg-teal-500 text-white px-4 py-2 rounded mt-2 hover:bg-teal-600 transition-all duration-300"
        >
          Check Utilization Alert
        </button>
      </div>

      {/* Spending Insights Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-lg border border-teal-100">
        <h2 className="text-2xl font-semibold mb-4 text-teal-700">Spending Insights</h2>
        <SpendingBarChart />
      </div>

      {/* Credit Score Optimization Tips Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-lg border border-teal-100">
        <h2 className="text-2xl font-semibold mb-4 text-teal-700">Credit Score Optimization Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-teal-800">
          <li>
            <strong>Keep Credit Utilization Below 30%:</strong> Try to use less than 30% of your total credit limit to maintain a healthy credit score.
          </li>
          <li>
            <strong>Pay Bills on Time:</strong> Late payments can negatively impact your credit score. Set up reminders or automatic payments to avoid missing due dates.
          </li>
          <li>
            <strong>Avoid Multiple Credit Applications:</strong> Applying for multiple credit cards or loans in a short period can lower your credit score.
          </li>
          <li>
            <strong>Monitor Your Credit Report:</strong> Regularly check your credit report for errors and dispute any inaccuracies.
          </li>
          <li>
            <strong>Maintain a Healthy Mix of Credit:</strong> A good mix of secured (e.g., home loan) and unsecured (e.g., credit card) credit can improve your score.
          </li>
          <li>
            <strong>Limit New Credit:</strong> Avoid opening too many new credit accounts at once, as it can signal financial instability.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CreditScoreProtection;
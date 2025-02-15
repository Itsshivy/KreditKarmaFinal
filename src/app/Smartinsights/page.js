'use client'; // Ensure this is a client component

import { useState, useEffect } from 'react';

const SmartinsightsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [userID, setUserID] = useState('');
    const [totalIncome, setTotalIncome] = useState(0);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [spending, setSpending] = useState({ needs: 0, wants: 0, savings: 0 });
    const [selectedPlan, setSelectedPlan] = useState('50-30-20'); // Default plan
    const [overLimit, setOverLimit] = useState({ needs: false, wants: false, savings: false });

    // Fetch transactions from the JSON file
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('/transactions.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch transactions');
                }
                const data = await response.json();
                console.log('Fetched Transactions:', data); // Debugging log
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    // Filter transactions by userID
    useEffect(() => {
        if (userID) {
            console.log('Filtering transactions for user ID:', userID); // Debugging log
            const filtered = transactions.filter((transaction) => transaction.user_id === parseInt(userID));
            console.log('Filtered Transactions:', filtered); // Debugging log
            setFilteredTransactions(filtered);
        }
    }, [userID, transactions]);

    // Categorize transactions and calculate spending
    useEffect(() => {
        if (filteredTransactions.length > 0 && totalIncome > 0) {
            const categorizedSpending = {
                needs: 0,
                wants: 0,
                savings: 0,
            };

            filteredTransactions.forEach((transaction) => {
                const category = categorizeTransaction(transaction);
                categorizedSpending[category] += transaction.amount_spent;
            });

            // Calculate savings as: Savings = Income - (Needs + Wants)
            categorizedSpending.savings = totalIncome - (categorizedSpending.needs + categorizedSpending.wants);

            console.log('Categorized Spending:', categorizedSpending); // Debugging log
            setSpending(categorizedSpending);

            // Check if spending exceeds the ideal limits
            const limits = getPlanLimits(selectedPlan, totalIncome);
            setOverLimit({
                needs: categorizedSpending.needs > limits.needs,
                wants: categorizedSpending.wants > limits.wants,
                savings: categorizedSpending.savings < limits.savings, // Savings should be at least the ideal limit
            });
        }
    }, [filteredTransactions, totalIncome, selectedPlan]);

    // Function to categorize a transaction
    const categorizeTransaction = (transaction) => {
        const { overspending, saving_opportunity, unusual_expense } = transaction.insights;

        if (overspending && !saving_opportunity) {
            return 'needs'; // Essential and cannot be avoided
        } else if (overspending && unusual_expense && saving_opportunity) {
            return 'wants'; // Non-essential or luxury
        } else if (saving_opportunity && !overspending) {
            return 'savings'; // Saving opportunity
        } else {
            return 'wants'; // Default to "Wants" if no clear category
        }
    };

    // Function to get the ideal spending limits based on the selected plan
    const getPlanLimits = (plan, income) => {
        switch (plan) {
            case '50-30-20':
                return {
                    needs: income * 0.5,
                    wants: income * 0.3,
                    savings: income * 0.2,
                };
            case '75-15-10':
                return {
                    needs: income * 0.75,
                    wants: income * 0.15,
                    savings: income * 0.1,
                };
            default:
                return {
                    needs: income * 0.5,
                    wants: income * 0.3,
                    savings: income * 0.2,
                };
        }
    };

    // Calculate spending percentages based on total income
    const needsPercentage = totalIncome > 0 ? Math.min((spending.needs / totalIncome) * 100, 100).toFixed(2) : 0;
    const wantsPercentage = totalIncome > 0 ? Math.min((spending.wants / totalIncome) * 100, 100).toFixed(2) : 0;
    const savingsPercentage = totalIncome > 0 ? Math.min((spending.savings / totalIncome) * 100, 100).toFixed(2) : 0;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-8">Spending Insights</h1>

            {/* User Input Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Enter Your Details</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="User ID"
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Total Income"
                        value={totalIncome}
                        onChange={(e) => setTotalIncome(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>

            {/* Spending Plan Selection */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Select Spending Plan</h2>
                <div className="space-y-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="plan"
                            value="50-30-20"
                            checked={selectedPlan === '50-30-20'}
                            onChange={(e) => setSelectedPlan(e.target.value)}
                        />
                        <span>50:30:20 Plan</span>
                    </label>
                    <p className="text-sm text-gray-600">
                        Allocate 50% of your income to Needs, 30% to Wants, and 20% to Savings.
                    </p>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="plan"
                            value="75-15-10"
                            checked={selectedPlan === '75-15-10'}
                            onChange={(e) => setSelectedPlan(e.target.value)}
                        />
                        <span>75:15:10 Plan</span>
                    </label>
                    <p className="text-sm text-gray-600">
                        Allocate 75% of your income to Needs, 15% to Wants, and 10% to Savings.
                    </p>
                </div>
            </div>

            {/* Display Spending Breakdown */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Spending Breakdown</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl">Needs: {needsPercentage}%</h3>
                        <progress value={needsPercentage} max="100" className="w-full" />
                        {overLimit.needs && (
                            <p className="text-red-500">You're over the ideal range for Needs!</p>
                        )}
                    </div>
                    <div>
                        <h3 className="text-xl">Wants: {wantsPercentage}%</h3>
                        <progress value={wantsPercentage} max="100" className="w-full" />
                        {overLimit.wants && (
                            <p className="text-red-500">You're over the ideal range for Wants!</p>
                        )}
                    </div>
                    <div>
                        <h3 className="text-xl">Savings: {savingsPercentage}%</h3>
                        <progress value={savingsPercentage} max="100" className="w-full" />
                        {overLimit.savings && (
                            <p className="text-red-500">You're below the ideal range for Savings!</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Display Transactions */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <h2 className="text-2xl font-semibold mb-4">Transactions for User ID: {userID}</h2>
                {filteredTransactions.length > 0 ? (
                    <ul className="space-y-4">
                        {filteredTransactions.map((transaction) => (
                            <li key={transaction.transaction_id} className="border p-4 rounded-lg">
                                <p><strong>Merchant:</strong> {transaction.merchant}</p>
                                <p><strong>Category:</strong> {transaction.category}</p>
                                <p><strong>Amount Spent:</strong> {transaction.amount_spent}</p>
                                <p><strong>Budget:</strong> {transaction.budget}</p>
                                <p><strong>Date:</strong> {transaction.date}</p>
                                <p><strong>Insights:</strong> Overspending: {transaction.insights.overspending.toString()}, Saving Opportunity: {transaction.insights.saving_opportunity.toString()}, Unusual Expense: {transaction.insights.unusual_expense.toString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No transactions found for this user.</p>
                )}
            </div>
        </div>
    );
};

export default SmartinsightsPage;
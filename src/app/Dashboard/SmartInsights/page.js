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

    // Function to categorize a transaction into "Needs" or "Wants"
    const categorizeTransaction = (transaction) => {
        const { overspending, saving_opportunity, unusual_expense } = transaction.insights;

        if (
            (overspending && !saving_opportunity && !unusual_expense) || // Overspending, no saving opportunity, no unusual expense
            (!overspending && !saving_opportunity && !unusual_expense)   // No overspending, no saving opportunity, no unusual expense
        ) {
            return 'needs'; // Essential transactions
        } else {
            return 'wants'; // Non-essential or luxury transactions
        }
    };

    // Categorize transactions and calculate spending
    useEffect(() => {
        if (filteredTransactions.length > 0 && totalIncome > 0) {
            const categorizedSpending = {
                needs: 0,
                wants: 0,
            };

            // Categorize transactions and sum amounts
            filteredTransactions.forEach((transaction) => {
                const category = categorizeTransaction(transaction);
                categorizedSpending[category] += transaction.amount_spent;
            });

            // Calculate savings as: Savings = Income - (Needs + Wants)
            const savings = totalIncome - (categorizedSpending.needs + categorizedSpending.wants);

            console.log('Categorized Spending:', { ...categorizedSpending, savings }); // Debugging log
            setSpending({ ...categorizedSpending, savings });

            // Check if spending exceeds the ideal limits based on the selected plan
            const limits = getPlanLimits(selectedPlan, totalIncome);
            setOverLimit({
                needs: categorizedSpending.needs > limits.needs,
                wants: categorizedSpending.wants > limits.wants,
                savings: savings < limits.savings, // Savings should be at least the ideal limit
            });
        }
    }, [filteredTransactions, totalIncome, selectedPlan]);

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

    // Get the ideal spending limits for the selected plan
    const planLimits = getPlanLimits(selectedPlan, totalIncome);

    return (
        <div className="p-8 bg-gradient-to-br from-teal-50 to-teal-100 min-h-screen">
            <h1 className="text-5xl font-bold text-center mb-8 text-teal-900 bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">
                Spending Insights
            </h1>

            {/* User Input Section */}
            <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
                <h2 className="text-3xl font-bold mb-6 text-teal-800">Enter Your Details</h2>
                <div className="space-y-6 text-black">
                    <input
                        type="text"
                        placeholder="User ID"
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                        className="w-full p-3 border-2 border-teal-200 rounded-lg text-black focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                    />
                    <input
                        type="number"
                        placeholder="Total Income"
                        value={totalIncome}
                        onChange={(e) => setTotalIncome(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full p-3 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                    />
                </div>
            </div>

            {/* Spending Plan Selection */}
            <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
                <h2 className="text-3xl font-bold mb-6 text-teal-800">Select Spending Plan</h2>
                <div className="space-y-6 text-black">
                    <div
                        className={`p-6 rounded-xl cursor-pointer transition-all ${
                            selectedPlan === '50-30-20'
                                ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white'
                                : 'bg-teal-50 hover:bg-teal-100'
                        }`}
                        onClick={() => setSelectedPlan('50-30-20')}
                    >
                        <h3 className="text-2xl font-semibold">50:30:20 Plan</h3>
                        <p className="mt-2">
                            Allocate 50% of your income to Needs, 30% to Wants, and 20% to Savings.
                        </p>
                    </div>
                    <div
                        className={`p-6 rounded-xl cursor-pointer transition-all ${
                            selectedPlan === '75-15-10'
                                ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white'
                                : 'bg-teal-50 hover:bg-teal-100'
                        }`}
                        onClick={() => setSelectedPlan('75-15-10')}
                    >
                        <h3 className="text-2xl font-semibold">75:15:10 Plan</h3>
                        <p className="mt-2">
                            Allocate 75% of your income to Needs, 15% to Wants, and 10% to Savings.
                        </p>
                    </div>
                </div>
            </div>

            {/* Display Spending Breakdown */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-teal-800">Spending Breakdown</h2>
                <div className="space-y-6 text-black">
                    <div className="p-6 bg-teal-50 rounded-xl">
                        <h3 className="text-2xl font-semibold text-teal-800">Needs: {needsPercentage}%</h3>
                        <div className="w-full h-3 bg-teal-200 rounded-full mt-4">
                            <div
                                className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all"
                                style={{ width: `${needsPercentage}%` }}
                            ></div>
                        </div>
                        {overLimit.needs && (
                            <p className="mt-2 text-red-500">You're over the ideal range for Needs!</p>
                        )}
                    </div>
                    <div className="p-6 bg-teal-50 rounded-xl">
                        <h3 className="text-2xl font-semibold text-teal-800">Wants: {wantsPercentage}%</h3>
                        <div className="w-full h-3 bg-teal-200 rounded-full mt-4">
                            <div
                                className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all"
                                style={{ width: `${wantsPercentage}%` }}
                            ></div>
                        </div>
                        {overLimit.wants && (
                            <p className="mt-2 text-red-500">You're over the ideal range for Wants!</p>
                        )}
                    </div>
                    <div className="p-6 bg-teal-50 rounded-xl">
                        <h3 className="text-2xl font-semibold text-teal-800">Savings: {savingsPercentage}%</h3>
                        <div className="w-full h-3 bg-teal-200 rounded-full mt-4">
                            <div
                                className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all"
                                style={{ width: `${savingsPercentage}%` }}
                            ></div>
                        </div>
                        {overLimit.savings && (
                            <p className="mt-2 text-red-500">You're below the ideal range for Savings!</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Display Transactions */}
            <div className="bg-white p-8 rounded-2xl shadow-xl mt-8">
                <h2 className="text-3xl font-bold mb-6 text-teal-800">Transactions for User ID: {userID}</h2>
                {filteredTransactions.length > 0 ? (
                    <ul className="space-y-6 text-black">
                        {filteredTransactions.map((transaction) => (
                            <li
                                key={transaction.transaction_id}
                                className="p-6 bg-teal-50 rounded-xl hover:bg-teal-100 transition-all"
                            >
                                <p><strong className="text-teal-700">Merchant:</strong> {transaction.merchant}</p>
                                <p><strong className="text-teal-700">Category:</strong> {transaction.category}</p>
                                <p><strong className="text-teal-700">Amount Spent:</strong> {transaction.amount_spent}</p>
                                <p><strong className="text-teal-700">Budget:</strong> {transaction.budget}</p>
                                <p><strong className="text-teal-700">Date:</strong> {transaction.date}</p>
                                <p><strong className="text-teal-700">Insights:</strong> Overspending: {transaction.insights.overspending.toString()}, Saving Opportunity: {transaction.insights.saving_opportunity.toString()}, Unusual Expense: {transaction.insights.unusual_expense.toString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-teal-600">No transactions found for this user.</p>
                )}
            </div>
        </div>
    );
};

export default SmartinsightsPage;
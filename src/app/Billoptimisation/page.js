'use client'; // Ensure this is a client component

import { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';

const BillOptimization = () => {
    const [image, setImage] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [suggestions, setSuggestions] = useState('');
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [dueDates, setDueDates] = useState([]); // Array to store multiple due dates
    const [newDueDate, setNewDueDate] = useState({ name: '', day: '', expiryDate: '' }); // For adding new due dates
    const [alertActive, setAlertActive] = useState(false);

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setImage(file);
            extractTextFromImage(file); // Extract text from the uploaded image
        } else {
            alert('Please upload a valid JPG or PNG image.');
        }
    };

    // Extract text using Tesseract.js
    const extractTextFromImage = async (imageFile) => {
        setIsProcessing(true);
        try {
            const { data: { text } } = await Tesseract.recognize(
                imageFile,
                'eng', // Language (English)
                {
                    logger: (info) => console.log(info), // Optional: Log progress
                }
            );
            setExtractedText(text);
            generateSuggestions(text); // Generate suggestions based on extracted text
        } catch (error) {
            console.error('Error extracting text:', error);
            alert('Failed to extract text from the image.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Generate suggestions (mock logic for now)
    const generateSuggestions = (text) => {
        setIsLoadingSuggestions(true);

        // Simulate AI processing delay
        setTimeout(() => {
            const hardcodedSuggestions = `
✅ Pay More Than the Minimum – Always pay at least twice or thrice the minimum amount.
✅ Pay in Full Each Month – The best way to avoid interest charges.
✅ Use the 50-30-20 Rule – Allocate 20% of income to debt repayment and not save.
✅ Set Payment Alerts – Helps you avoid missing due dates.
✅ Use EMI Options Wisely – Convert large purchases into low-interest EMIs instead of paying minimum amounts.
            `;

            setSuggestions(hardcodedSuggestions);
            setIsLoadingSuggestions(false);
        }, 2000); // 2-second delay to simulate AI processing
    };

    // Add a new monthly due date entry
    const addDueDate = () => {
        if (!newDueDate.name || !newDueDate.day || !newDueDate.expiryDate) {
            alert('Please fill in all fields.');
            return;
        }

        const day = parseInt(newDueDate.day, 10);
        if (isNaN(day)) {
            alert('Please enter a valid day (1-31).');
            return;
        }

        const expiryDate = new Date(newDueDate.expiryDate);
        if (isNaN(expiryDate.getTime())) {
            alert('Please enter a valid expiry date.');
            return;
        }

        setDueDates([...dueDates, { ...newDueDate, id: Date.now() }]);
        setNewDueDate({ name: '', day: '', expiryDate: '' }); // Reset the form
    };

    // Remove a due date entry
    const removeDueDate = (id) => {
        setDueDates(dueDates.filter((entry) => entry.id !== id));
    };

    // Handle monthly due date alerts
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const currentDay = now.getDate();
            let isDueDateApproaching = false;

            dueDates.forEach((entry) => {
                const dueDay = parseInt(entry.day, 10);
                const expiryDate = new Date(entry.expiryDate);
                const daysUntilDue = dueDay - currentDay;

                // Check if the due date is approaching (1-2 days before) or overdue, and if the expiry date hasn't passed
                if ((daysUntilDue === 1 || daysUntilDue === 0 || daysUntilDue === -1) && now <= expiryDate) {
                    isDueDateApproaching = true;
                }
            });

            setAlertActive(isDueDateApproaching);
        }, 1000 * 60 * 60); // Check every hour

        return () => clearInterval(interval);
    }, [dueDates]);

    // Play buzzer sound when alert is active
    useEffect(() => {
        if (alertActive) {
            const buzzerSound = new Audio('/buzzer.mp3'); // Ensure you have a buzzer.mp3 file in your public folder
            buzzerSound.loop = true;
            buzzerSound.play();

            return () => {
                buzzerSound.pause();
                buzzerSound.currentTime = 0;
            };
        }
    }, [alertActive]);

    // Format expiry date as MM/YY
    const formatExpiryDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
        const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
        return `${month}/${year}`;
    };

    return (
        <div className="p-8 bg-gradient-to-br from-teal-50 to-teal-100 min-h-screen">
            <h1 className="text-5xl font-bold text-center mb-8 text-teal-900 bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">
                Spending Insights
            </h1>

            {/* Payment Due Date Alert Section (Always at the top) */}
            <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
                <h2 className="text-3xl font-bold mb-6 text-teal-800">Set Monthly Payment Due Dates</h2>
                <div className="space-y-6">
                    {/* Form to add new monthly due dates */}
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Name (e.g., Credit Card Name)"
                            value={newDueDate.name}
                            onChange={(e) => setNewDueDate({ ...newDueDate, name: e.target.value })}
                            className="w-1/3 p-3 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                        />
                        <input
                            type="number"
                            placeholder="Day of Month (1-31)"
                            value={newDueDate.day}
                            onChange={(e) => setNewDueDate({ ...newDueDate, day: e.target.value })}
                            className="w-1/3 p-3 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                        />
                        <input
                            type="date"
                            placeholder="Expiry Date"
                            value={newDueDate.expiryDate}
                            onChange={(e) => setNewDueDate({ ...newDueDate, expiryDate: e.target.value })}
                            className="w-1/3 p-3 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                        />
                        <button
                            onClick={addDueDate}
                            className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-all"
                        >
                            Add
                        </button>
                    </div>

                    {/* List of monthly due dates with serial numbers */}
                    <div className="space-y-4">
                        {dueDates.map((entry, index) => (
                            <div key={entry.id} className="flex items-center justify-between bg-teal-50 p-4 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <span className="text-teal-800 font-bold">{index + 1}.</span>
                                    <span className="text-teal-800">{entry.name}</span>
                                    <span className="text-teal-600">Due on the {entry.day}th of every month</span>
                                    <span className="text-teal-600">Expiry Date: {formatExpiryDate(entry.expiryDate)}</span>
                                </div>
                                <button
                                    onClick={() => removeDueDate(entry.id)}
                                    className="text-red-500 hover:text-red-700 transition-all"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Alert message */}
                    {alertActive && (
                        <div className="text-red-600 font-bold">
                            ⚠️ Payment Due Date Alert! Please make your payment immediately.
                        </div>
                    )}
                </div>
            </div>

            {/* Image Upload Section */}
            <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
                <h2 className="text-3xl font-bold mb-6 text-teal-800">Upload Credit Card Bill</h2>
                <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleImageUpload}
                    className="w-full p-3 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                />
                {isProcessing && <p className="mt-4 text-teal-600">Processing image... Please wait.</p>}
            </div>

            {/* Extracted Text Section */}
            {extractedText && (
                <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
                    <h2 className="text-3xl font-bold mb-6 text-teal-800">Extracted Text</h2>
                    <pre className="bg-teal-50 p-6 rounded-xl whitespace-pre-wrap">{extractedText}</pre>
                </div>
            )}

            {/* Optimization Suggestions Section (Only appears after bill is processed) */}
            {suggestions && (
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-bold mb-6 text-teal-800">Optimization Suggestions</h2>
                    <div className="space-y-6">
                        {isLoadingSuggestions ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
                                <p className="ml-3 text-teal-600">Generating suggestions...</p>
                            </div>
                        ) : (
                            <p className="text-teal-600 whitespace-pre-wrap">{suggestions}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillOptimization;
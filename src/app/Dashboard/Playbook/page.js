"use client"; // Required for client-side interactivity in Next.js

import { useState, useEffect } from "react";

export default function CreditCardManager() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [annualFees, setAnnualFees] = useState("");
  const [cards, setCards] = useState([]);

  // Load cards from localStorage on component mount
  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem("creditCards")) || [];
    if (savedCards.length === 0) {
      const defaultCard = {
        id: Date.now(),
        cardNumber: "**** **** **** 1234",
        cardHolder: "HDFC Regalia Card",
        expiryDate: "12/26",
        cvv: "***",
        annualFees: 2500,
        balance: 50000,
        rewardPoints: 12000,
        image: "enter pic here", // Placeholder for image
      };
      setCards([defaultCard]);
      localStorage.setItem("creditCards", JSON.stringify([defaultCard]));
    } else {
      setCards(savedCards);
    }
  }, []);

  // Save cards to localStorage whenever the cards state changes
  useEffect(() => {
    localStorage.setItem("creditCards", JSON.stringify(cards));
  }, [cards]);

  // Function to handle adding a new card
  const handleAddCard = (e) => {
    e.preventDefault();

    // Create a new card object
    const newCard = {
      id: Date.now(), // Unique ID for the card
      cardNumber,
      cardHolder,
      expiryDate,
      cvv,
      annualFees: parseFloat(annualFees),
      balance: Math.floor(Math.random() * 10000), // Random balance for demo
      rewardPoints: Math.floor(Math.random() * 1000), // Random reward points for demo
      image: "enter pic here", // Placeholder for image
    };

    // Add the new card to the list
    setCards([...cards, newCard]);

    // Clear the form fields
    setCardNumber("");
    setCardHolder("");
    setExpiryDate("");
    setCvv("");
    setAnnualFees("");
  };

  // Format card number with spaces every 4 digits
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, ""); // Remove non-digits
    const formatted = cleaned.replace(/(\d{4})/g, "$1 ").trim(); // Add space every 4 digits
    return formatted;
  };

  // Format expiry date with '/' after 2 digits
  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, ""); // Remove non-digits
    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-200 to-teal-700 flex flex-col items-center p-4">
      {/* Add New Card Form */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Credit Card</h2>
        <form onSubmit={handleAddCard} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
              placeholder="1234 5678 9012 3456"
              maxLength={19} // 16 digits + 3 spaces
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Holder Name</label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                placeholder="MM/YY"
                maxLength={5} // MM/YY
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))} // Only numbers, max 3 digits
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                placeholder="123"
                maxLength={3}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Annual Fees</label>
            <input
              type="number"
              value={annualFees}
              onChange={(e) => setAnnualFees(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
              placeholder="₹0.00"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Add Card
          </button>
        </form>
      </div>

      {/* Display Existing Cards */}
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Credit Cards</h2>
        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-300 w-full">
              <div className="flex items-center space-x-4">
                <img src="https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/f7da2911-8309-4463-a6fe-b26521c94165/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/Super%20Premium/Regalia/regalia_banner1.png" alt="Credit Card" className="w-16 h-10 rounded-lg" />
                <div>
                  <h3 className="text-lg font-semibold">{card.cardHolder}</h3>
                  <ul className="text-sm text-gray-600 mt-1">
                    <li>Balance: ₹{card.balance.toFixed(2)}</li>
                    <li>Reward Points: {card.rewardPoints}</li>
                    <li>Annual Fees: ₹{card.annualFees.toFixed(2)}</li>
                    <li>Expiry Date: {card.expiryDate}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
"use client"; // Required for client-side interactivity in Next.js

import { useState } from "react";

export default function CardRecommendation() {
  // State to store user input
  const [income, setIncome] = useState("");
  const [spendingHabits, setSpendingHabits] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [annualFees, setAnnualFees] = useState(false);
  const [employment, setEmployment] = useState("");
  const [recommendedCards, setRecommendedCards] = useState([]);
  const [error, setError] = useState(null); // State for error messages

  // Sponsored cards (hardcoded for now)
  const sponsoredCards = [
    {
      name: "INDUSLAND BANK CELESTA",
      details: [
        "Premium credit card for high-income individuals.",
        "Exclusive lounge access at airports worldwide.",
        "Reward points on every spend with no upper limit.",
        "Complimentary golf games and spa sessions.",
        "Annual fee: ₹10,000 + GST.",
      ],
      eligibility: "Minimum income: ₹1,00,000 per month.",
      benefits: [
        "5x reward points on dining and travel.",
        "Complimentary airport lounge access.",
        "24/7 concierge service.",
      ],
      applyLink: "https://www.indusind.com/celesta",
    },
    {
      name: "SBI AURUM Credit Card",
      details: [
        "Luxury credit card for high-net-worth individuals.",
        "Unlimited domestic and international airport lounge access.",
        "24/7 concierge service for travel, dining, and lifestyle.",
        "Reward points on every spend with accelerated earnings on luxury brands.",
        "Annual fee: ₹15,000 + GST.",
      ],
      eligibility: "Minimum income: ₹1,50,000 per month.",
      benefits: [
        "10x reward points on luxury brands.",
        "Complimentary spa and golf sessions.",
        "Travel insurance up to ₹1 crore.",
      ],
      applyLink: "https://www.sbi.co.in/aurum",
    },
    {
      name: "HDFC Regalia Credit Card",
      details: [
        "4 reward points per ₹150 spent.",
        "Complimentary airport lounge access.",
        "Annual fee: ₹2,500 + GST.",
      ],
      eligibility: "Minimum income: ₹50,000 per month.",
      benefits: [
        "4x reward points on all spends.",
        "Discounted movie tickets.",
        "Travel and dining offers.",
      ],
      applyLink: "https://www.hdfcbank.com/regalia",
    },
  ];

  // Dataset for all cards
  const cardDataset = [
    // High income cards
    {
      name: "HDFC Infinia Credit Card",
      category: "high-income",
      annualFee: 10000,
      details: [
        "Unlimited lounge access, premium rewards, golf benefits.",
        "Annual fee: ₹10,000 + GST.",
      ],
      eligibility: "Minimum income: ₹1,50,000 per month.",
      benefits: [
        "10x reward points on travel and dining.",
        "Complimentary golf sessions.",
        "Travel insurance up to ₹2 crore.",
      ],
      applyLink: "https://www.hdfcbank.com/infinia",
    },
    {
      name: "AMEX Platinum Credit Card",
      category: "high-income",
      annualFee: 60000,
      details: [
        "Luxury travel perks, concierge service, hotel privileges.",
        "Annual fee: ₹60,000 + GST.",
      ],
      eligibility: "Minimum income: ₹2,00,000 per month.",
      benefits: [
        "Exclusive access to AMEX lounges.",
        "Complimentary Marriott Bonvoy Gold status.",
        "24/7 personal concierge.",
      ],
      applyLink: "https://www.americanexpress.com/platinum",
    },
    {
      name: "Citi Prestige Credit Card",
      category: "high-income",
      annualFee: 20000,
      details: [
        "High reward points, international travel benefits, airport lounge access.",
        "Annual fee: ₹20,000 + GST.",
      ],
      eligibility: "Minimum income: ₹1,00,000 per month.",
      benefits: [
        "4th night free at luxury hotels.",
        "Complimentary airport transfers.",
        "10x reward points on international spends.",
      ],
      applyLink: "https://www.citibank.com/prestige",
    },
    {
      name: "ICICI Sapphiro Credit Card",
      category: "high-income",
      annualFee: 3500,
      details: [
        "Buy one get one on movies, dining, and lifestyle privileges.",
        "Annual fee: ₹3,500 + GST.",
      ],
      eligibility: "Minimum income: ₹75,000 per month.",
      benefits: [
        "2x reward points on dining and entertainment.",
        "Complimentary airport lounge access.",
        "Travel insurance up to ₹50 lakh.",
      ],
      applyLink: "https://www.icicibank.com/sapphiro",
    },
    {
      name: "SBI Aurum Credit Card",
      category: "high-income",
      annualFee: 15000,
      details: [
        "Premium rewards, travel insurance, and luxury discounts.",
        "Annual fee: ₹15,000 + GST.",
      ],
      eligibility: "Minimum income: ₹1,50,000 per month.",
      benefits: [
        "10x reward points on luxury brands.",
        "Complimentary spa and golf sessions.",
        "Travel insurance up to ₹1 crore.",
      ],
      applyLink: "https://www.sbi.co.in/aurum",
    },

    // Student cards
    {
      name: "SBI Student Plus Advantage Card",
      category: "student",
      annualFee: 0,
      details: [
        "Ideal for students with an existing education loan, offers cashback and reward points.",
      ],
      eligibility: "Must be a student with an education loan.",
      benefits: [
        "5% cashback on online shopping.",
        "Reward points on all spends.",
        "No annual fee.",
      ],
      applyLink: "https://www.sbi.co.in/student-plus",
    },
    {
      name: "ICICI Bank Student Forex Prepaid Card",
      category: "student",
      annualFee: 0,
      details: [
        "Best for students going abroad, provides easy forex transactions and discounts.",
      ],
      eligibility: "Must be a student traveling abroad.",
      benefits: [
        "Zero forex markup fee.",
        "Discounts on international transactions.",
        "No annual fee.",
      ],
      applyLink: "https://www.icicibank.com/student-forex",
    },
    {
      name: "HDFC Bank ISIC Student ForexPlus Card",
      category: "student",
      annualFee: 0,
      details: [
        "International Student Identity Card (ISIC) benefits, travel discounts, and forex protection.",
      ],
      eligibility: "Must be a student with an ISIC card.",
      benefits: [
        "Discounted airfare and accommodations.",
        "Forex protection.",
        "No annual fee.",
      ],
      applyLink: "https://www.hdfcbank.com/isic",
    },
    {
      name: "Axis Bank Insta Easy Credit Card",
      category: "student",
      annualFee: 0,
      details: [
        "Requires a fixed deposit, offers easy approval, and decent rewards.",
      ],
      eligibility: "Must have a fixed deposit with Axis Bank.",
      benefits: [
        "Easy approval process.",
        "Reward points on all spends.",
        "No annual fee.",
      ],
      applyLink: "https://www.axisbank.com/insta-easy",
    },
    {
      name: "Kotak 811 #DreamDifferent Credit Card",
      category: "student",
      annualFee: 0,
      details: [
        "A secured card against FD, no income proof needed, and good cashback offers.",
      ],
      eligibility: "Must have a fixed deposit with Kotak Bank.",
      benefits: [
        "5% cashback on online shopping.",
        "No income proof required.",
        "No annual fee.",
      ],
      applyLink: "https://www.kotak.com/dream-different",
    },

    // Low income cards
    {
      name: "SBI SimplySAVE Credit Card",
      category: "low-income",
      annualFee: 499,
      details: [
        "Low annual fee, great rewards on daily spending (movies, groceries, dining).",
      ],
      eligibility: "Minimum income: ₹20,000 per month.",
      benefits: [
        "5x reward points on groceries and dining.",
        "Discounted movie tickets.",
        "Low annual fee.",
      ],
      applyLink: "https://www.sbi.co.in/simply-save",
    },
    {
      name: "ICICI Platinum Chip Credit Card",
      category: "low-income",
      annualFee: 0,
      details: [
        "No annual fee (if conditions met), good for beginners, secure chip-enabled card.",
      ],
      eligibility: "Minimum income: ₹15,000 per month.",
      benefits: [
        "2x reward points on all spends.",
        "No annual fee.",
        "Secure chip-enabled card.",
      ],
      applyLink: "https://www.icicibank.com/platinum-chip",
    },
    {
      name: "HDFC MoneyBack Credit Card",
      category: "low-income",
      annualFee: 500,
      details: [
        "Earn cashback on every purchase, great for small daily expenses.",
      ],
      eligibility: "Minimum income: ₹25,000 per month.",
      benefits: [
        "1% cashback on all spends.",
        "Discounted fuel surcharge.",
        "Low annual fee.",
      ],
      applyLink: "https://www.hdfcbank.com/moneyback",
    },
    {
      name: "Axis Bank MY Zone Credit Card",
      category: "low-income",
      annualFee: 500,
      details: [
        "Free Zomato Pro, movie discounts, and affordable fees.",
      ],
      eligibility: "Minimum income: ₹20,000 per month.",
      benefits: [
        "Free Zomato Pro membership.",
        "Discounted movie tickets.",
        "Low annual fee.",
      ],
      applyLink: "https://www.axisbank.com/my-zone",
    },
    {
      name: "Kotak 811 #DreamDifferent Credit Card",
      category: "low-income",
      annualFee: 0,
      details: [
        "No income proof needed, secured against an FD, with good cashback benefits.",
      ],
      eligibility: "Must have a fixed deposit with Kotak Bank.",
      benefits: [
        "5% cashback on online shopping.",
        "No income proof required.",
        "No annual fee.",
      ],
      applyLink: "https://www.kotak.com/dream-different",
    },
    {
      name: "BOB Financial Prime Credit Card",
      category: "low-income",
      annualFee: 500,
      details: [
        "Low annual fee, decent rewards on fuel, groceries, and utilities.",
      ],
      eligibility: "Minimum income: ₹20,000 per month.",
      benefits: [
        "2x reward points on fuel and groceries.",
        "Discounted utility bill payments.",
        "Low annual fee.",
      ],
      applyLink: "https://www.bobfinancial.com/prime",
    },

    // Low credit score cards
    {
      name: "SBI SimplySAVE Credit Card",
      category: "low-credit-score",
      annualFee: 499,
      details: [
        "Easy approval, low annual fee, rewards on daily spending.",
      ],
      eligibility: "Minimum credit score: 300.",
      benefits: [
        "5x reward points on groceries and dining.",
        "Discounted movie tickets.",
        "Low annual fee.",
      ],
      applyLink: "https://www.sbi.co.in/simply-save",
    },
    {
      name: "ICICI Bank Instant Platinum Credit Card",
      category: "low-credit-score",
      annualFee: 0,
      details: [
        "No income proof required, issued against an FD.",
      ],
      eligibility: "Must have a fixed deposit with ICICI Bank.",
      benefits: [
        "2x reward points on all spends.",
        "No annual fee.",
        "Secure chip-enabled card.",
      ],
      applyLink: "https://www.icicibank.com/instant-platinum",
    },
    {
      name: "HDFC Bank MoneyBack Credit Card",
      category: "low-credit-score",
      annualFee: 500,
      details: [
        "Good for beginners, cashback on transactions.",
      ],
      eligibility: "Minimum credit score: 300.",
      benefits: [
        "1% cashback on all spends.",
        "Discounted fuel surcharge.",
        "Low annual fee.",
      ],
      applyLink: "https://www.hdfcbank.com/moneyback",
    },
    {
      name: "Kotak 811 #DreamDifferent Credit Card",
      category: "low-credit-score",
      annualFee: 0,
      details: [
        "FD-based card, ideal for improving your score.",
      ],
      eligibility: "Must have a fixed deposit with Kotak Bank.",
      benefits: [
        "5% cashback on online shopping.",
        "No income proof required.",
        "No annual fee.",
      ],
      applyLink: "https://www.kotak.com/dream-different",
    },

    // Mid credit score cards
    {
      name: "HDFC Regalia First Credit Card",
      category: "mid-credit-score",
      annualFee: 2500,
      details: [
        "Travel & lifestyle benefits with a moderate annual fee.",
      ],
      eligibility: "Minimum credit score: 600.",
      benefits: [
        "4x reward points on travel and dining.",
        "Complimentary airport lounge access.",
        "Travel insurance up to ₹1 crore.",
      ],
      applyLink: "https://www.hdfcbank.com/regalia-first",
    },
    {
      name: "SBI Prime Credit Card",
      category: "mid-credit-score",
      annualFee: 2999,
      details: [
        "Rewards on groceries, dining, and fuel.",
      ],
      eligibility: "Minimum credit score: 600.",
      benefits: [
        "5x reward points on groceries and dining.",
        "Discounted fuel surcharge.",
        "Travel insurance up to ₹50 lakh.",
      ],
      applyLink: "https://www.sbi.co.in/prime",
    },
    {
      name: "ICICI Amazon Pay Credit Card",
      category: "mid-credit-score",
      annualFee: 0,
      details: [
        "No annual fee, great for Amazon shopping.",
      ],
      eligibility: "Minimum credit score: 600.",
      benefits: [
        "5% cashback on Amazon purchases.",
        "No annual fee.",
        "Reward points on all spends.",
      ],
      applyLink: "https://www.icicibank.com/amazon-pay",
    },
    {
      name: "Axis Bank Flipkart Credit Card",
      category: "mid-credit-score",
      annualFee: 500,
      details: [
        "Ideal for Flipkart users with cashback benefits.",
      ],
      eligibility: "Minimum credit score: 600.",
      benefits: [
        "5% cashback on Flipkart purchases.",
        "Discounted fuel surcharge.",
        "Low annual fee.",
      ],
      applyLink: "https://www.axisbank.com/flipkart",
    },
    {
      name: "IndusInd Legend Credit Card",
      category: "mid-credit-score",
      annualFee: 5000,
      details: [
        "Low joining fee, good reward points structure.",
      ],
      eligibility: "Minimum credit score: 600.",
      benefits: [
        "4x reward points on travel and dining.",
        "Complimentary airport lounge access.",
        "Travel insurance up to ₹1 crore.",
      ],
      applyLink: "https://www.indusind.com/legend",
    },
  ];

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error message
    setError(null);

    // Validate all fields
    if (!income || !spendingHabits || !creditScore || !employment) {
      setError("Please answer all questions first.");
      return;
    }

    // Parse income and credit score
    const incomeValue = parseIncome(income);
    const creditScoreValue = parseCreditScore(creditScore);

    // Logic to recommend cards based on user input
    let cards = [];

    // Filter cards based on annual fees preference
    const filteredCards = cardDataset.filter(
      (card) => annualFees || card.annualFee === 0
    );

    // High income
    if (incomeValue >= 1000000) {
      cards = filteredCards.filter((card) => card.category === "high-income");
    }
    // Students
    else if (employment === "student") {
      cards = filteredCards.filter((card) => card.category === "student");
    }
    // Low income
    else if (incomeValue < 500000) {
      cards = filteredCards.filter((card) => card.category === "low-income");
    }
    // Low credit score
    else if (creditScoreValue < 600) {
      cards = filteredCards.filter((card) => card.category === "low-credit-score");
    }
    // Mid credit score
    else if (creditScoreValue >= 600 && creditScoreValue < 750) {
      cards = filteredCards.filter((card) => card.category === "mid-credit-score");
    }

    // Further filter cards based on spending habits
    if (spendingHabits === "fuel") {
      cards = cards.filter((card) =>
        card.benefits.some((benefit) =>
          benefit.toLowerCase().includes("fuel")
        )
      );
    } else if (spendingHabits === "travel") {
      cards = cards.filter((card) =>
        card.benefits.some((benefit) =>
          benefit.toLowerCase().includes("travel") ||
          benefit.toLowerCase().includes("flight") ||
          benefit.toLowerCase().includes("hotel")
        )
      );
    } else if (spendingHabits === "dining") {
      cards = cards.filter((card) =>
        card.benefits.some((benefit) =>
          benefit.toLowerCase().includes("dining")
        )
      );
    } else if (spendingHabits === "groceries") {
      cards = cards.filter((card) =>
        card.benefits.some((benefit) =>
          benefit.toLowerCase().includes("groceries")
        )
      );
    } else if (spendingHabits === "shopping") {
      cards = cards.filter((card) =>
        card.benefits.some((benefit) =>
          benefit.toLowerCase().includes("shopping")
        )
      );
    }

    // Update recommended cards
    setRecommendedCards(cards);
  };

  // Helper function to parse income
  const parseIncome = (income) => {
    if (income === "25+") return 2500000;
    const [min] = income.split("-").map(Number);
    return min * 1000;
  };

  // Helper function to parse credit score
  const parseCreditScore = (creditScore) => {
    const [min] = creditScore.split("-").map(Number);
    return min;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-teal-700 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-teal-700">
          Best Credit Card For You
        </h1>

        {/* User Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Annual Income */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              What is your annual income?
            </label>
            <select
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="2-3">2-3L</option>
              <option value="3-4">3-4L</option>
              <option value="4-5">4-5L</option>
              <option value="5-6">5-6L</option>
              <option value="6-7">6-7L</option>
              <option value="7-8">7-8L</option>
              <option value="8-9">8-9L</option>
              <option value="9-10">9-10L</option>
              <option value="10-15">10-15L</option>
              <option value="15-20">15-20L</option>
              <option value="20-25">20-25L</option>
              <option value="25+">25L+</option>
            </select>
          </div>

          {/* Spending Habits */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Where do you tend to spend the most money?
            </label>
            <select
              value={spendingHabits}
              onChange={(e) => setSpendingHabits(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="shopping">Shopping</option>
              <option value="travel">Travel</option>
              <option value="dining">Dining</option>
              <option value="groceries">Groceries</option>
              <option value="fuel">Fuel</option>
            </select>
          </div>

          {/* Credit Score */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              What is your credit score?
            </label>
            <select
              value={creditScore}
              onChange={(e) => setCreditScore(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              {Array.from({ length: 12 }, (_, i) => {
                const min = 300 + i * 50;
                const max = min + 50;
                return (
                  <option key={i} value={`${min}-${max}`}>
                    {min}-{max}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Annual Fees */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Are you okay with annual fees?
            </label>
            <select
              value={annualFees ? "yes" : "no"}
              onChange={(e) => setAnnualFees(e.target.value === "yes")}
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
              required
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Employment Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              What is your employment status?
            </label>
            <select
              value={employment}
              onChange={(e) => setEmployment(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self-Employed</option>
              <option value="student">Student</option>
            </select>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Get Recommendations
          </button>
        </form>

        {/* Recommended Cards Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-teal-700">
            Recommended Cards
          </h2>
          {recommendedCards.length > 0 ? (
            <div className="space-y-3">
              {recommendedCards.map((card, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <h3 className="font-medium text-black">{card.name}</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {card.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                  <div className="mt-2">
                    <h4 className="font-semibold text-black">Eligibility:</h4>
                    <p className="text-sm text-gray-600">{card.eligibility}</p>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold text-black">Benefits:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {card.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={card.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
                  >
                    Apply Now
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              Sorry, you are not eligible for any cards right now. We'll notify
              you when you are.
            </p>
          )}
        </div>

        {/* Sponsored Cards Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-teal-700">
            Sponsored Cards
          </h2>
          <div className="space-y-3">
            {sponsoredCards.map((card, index) => (
              <div
                key={index}
                className="p-4 bg-yellow-100 border border-yellow-200 rounded-lg"
              >
                <h3 className="font-medium text-black">{card.name}</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {card.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
                <div className="mt-2">
                  <h4 className="font-semibold text-black">Eligibility:</h4>
                  <p className="text-sm text-gray-600">{card.eligibility}</p>
                </div>
                <div className="mt-2">
                  <h4 className="font-semibold text-black">Benefits:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {card.benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href={card.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
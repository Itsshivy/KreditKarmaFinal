"use client"; // Required for client-side interactivity
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-[#00796B]">Welcome to CrediWise! </h1>
      <p className="mt-4 text-xl text-gray-700">
        Your ultimate financial companion for smarter credit and spending decisions.
      </p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {[
          {
            title: "Smart Credit Utilisation",
            description: "Manage your credit score with smart utilization.",
            link: "/Dashboard/CreditScore",
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3JlZGl0JTIwc2NvcmV8ZW58MHx8MHx8fDA%3D",
          },
          {
            title: "Smart Spending Insights",
            description: "Track, analyze, and optimize your spending.",
            link: "/Dashboard/SmartInsights",
            image: "https://plus.unsplash.com/premium_photo-1681487803114-637de228039c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNyZWRpdCUyMHNjb3JlfGVufDB8fDB8fHww",
          },
          {
            title: "Bill Optimisation",
            description: "Cut costs and streamline payments with smart bill optimization.",
            link: "/Dashboard/BillOptimisation",
            image: "https://plus.unsplash.com/premium_photo-1675055730240-96a4ed84e482?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "CreditKey",
            description: "Unlock your best credit card recommendations.",
            link: "/Dashboard/CreditCard",
            image: "https://www.cardexpert.in/wp-content/uploads/2024/02/best-credit-card-india-2024.jpg",
          },
          {
            title: "Credit Card Playbook",
            description: "Maximize rewards, avoid fees, and build credit with expert strategies.",
            link: "/Dashboard/DebtManagement",
            image: "https://plus.unsplash.com/premium_photo-1681819806412-418bb52f8cc8?q=80&w=2898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Fraud",
            description: "Monitor and grow your savings effortlessly.",
            link: "/Dashboard/Fraud",
            image: "https://plus.unsplash.com/premium_photo-1682310138171-14794943c4c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJhdWR8ZW58MHx8MHx8fDA%3D",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-800">{card.title}</h2>
            <p className="text-gray-600 text-lg mt-2">{card.description}</p>

            {/* Image Container */}
            <div className="relative w-full h-64 mt-4 rounded-xl overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                width={500}
                height={256}
                className="w-full h-full object-cover rounded-xl"
                priority
              />
            </div>

            <div className="mt-6 text-center">
              <Link
                href={card.link}
                className="text-xl bg-[#00796B] text-white px-6 py-3 rounded-lg hover:bg-[#004D40]"
              >
                Explore →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
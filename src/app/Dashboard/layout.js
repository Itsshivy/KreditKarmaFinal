"use client"; // Required for client-side interactivity
import React from "react";
import { 
  FaTachometerAlt, 
  FaBook, 
  FaShieldAlt, 
  FaChartLine, 
  FaWallet, 
  FaMoneyBillAlt, 
  FaCreditCard 
} from "react-icons/fa";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#E0F7FA] text-gray-800 p-5 shadow-lg">
        <h2 className="text-2xl font-bold text-[#00796B]">CrediWise</h2>
        <ul className="mt-8 space-y-4 text-lg">
          <li className="p-4 bg-[#B2DFDB] hover:bg-[#80CBC4] rounded-lg flex items-center gap-3">
            <FaTachometerAlt size={24} className="text-[#00796B]" />
            <Link href="/Dashboard">Dashboard</Link>
          </li>
          <li className="p-4 bg-[#B2DFDB] hover:bg-[#80CBC4] rounded-lg flex items-center gap-3">
            <FaChartLine size={24} className="text-[#00796B]" />
            <Link href="/Dashboard/CreditScore">Smart Credit Utilisation</Link>
          </li>
          <li className="p-4 bg-[#B2DFDB] hover:bg-[#80CBC4] rounded-lg flex items-center gap-3">
            <FaWallet size={24} className="text-[#00796B]" />
            <Link href="/Dashboard/SmartInsights">Smart Spending Insights</Link>
          </li>
          <li className="p-4 bg-[#B2DFDB] hover:bg-[#80CBC4] rounded-lg flex items-center gap-3">
            <FaMoneyBillAlt size={24} className="text-[#00796B]" />
            <Link href="/dashboard/reminders">Bill Optimisation</Link>
          </li>
          <li className="p-4 bg-[#B2DFDB] hover:bg-[#80CBC4] rounded-lg flex items-center gap-3">
            <FaCreditCard size={24} className="text-[#00796B]" />
            <Link href="/dashboard/health">CreditKey</Link>
          </li>
          {/* New Sections */}
          <li className="p-4 bg-[#B2DFDB] hover:bg-[#80CBC4] rounded-lg flex items-center gap-3">
            <FaBook size={24} className="text-[#00796B]" />
            <Link href="/dashboard/playbook">Credit Card Playbook</Link>
          </li>
          <li className="p-4 bg-[#B2DFDB] hover:bg-[#80CBC4] rounded-lg flex items-center gap-3">
            <FaShieldAlt size={24} className="text-[#00796B]" />
            <Link href="/dashboard/fraud">Fraud Protection</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#E0F7FA] p-5">
        {children}
      </div>
    </div>
  );
}

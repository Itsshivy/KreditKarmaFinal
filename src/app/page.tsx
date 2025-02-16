"use client";
import { motion } from "framer-motion";
import { FaCreditCard, FaChartLine, FaShieldAlt, FaLightbulb } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Sign Up Modal Component
const SignUpModal = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter(); // Use Next.js router

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a successful sign-up
    alert("Sign up successful! Redirecting to dashboard...");
    onClose(); // Close the modal
    router.push("/Dashboard"); // Redirect to the dashboard
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-teal-900 mb-6">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <label className="block text-sm font-medium text-teal-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-teal-600 hover:text-teal-800"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

// Home Component
export default function Home() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      {/* Sign Up Modal */}
      {isSignUpModalOpen && (
        <SignUpModal onClose={() => setIsSignUpModalOpen(false)} />
      )}

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full py-32 bg-gradient-to-r from-teal-500 to-emerald-400"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Welcome to <span className="text-teal-700">CrediWise</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-white mb-8"
          >
            Smart Spending, Smarter Credit.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="space-x-4"
          >
            <button
              onClick={() => setIsSignUpModalOpen(true)}
              className="bg-teal-600 text-teal-900 px-8 py-4 rounded-full font-semibold hover:bg-teal-300 transition"
            >
              Get Started
            </button>
            <button className="bg-transparent border border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-teal-900 transition">
              Watch Demo
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-teal-900"
          >
            Features
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <FaCreditCard className="text-5xl text-teal-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-teal-900">Spending Insights</h3>
              <p className="text-teal-700">Track your expenses with 50-30-20 and 75-15-10 rules.</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <FaChartLine className="text-5xl text-teal-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-teal-900">Credit Card Management</h3>
              <p className="text-teal-700">Manage multiple credit cards and never miss a payment.</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <FaShieldAlt className="text-5xl text-teal-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-teal-900">Credit Score Protection</h3>
              <p className="text-teal-700">Stay below the 30% threshold to protect your credit score.</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <FaLightbulb className="text-5xl text-teal-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-teal-900">Personalized Recommendations</h3>
              <p className="text-teal-700">Find the best credit cards tailored to your spending habits.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full py-12 bg-teal-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 CrediWise. All rights reserved.</p>
          <div className="mt-6 space-x-6">
            <a href="#" className="hover:text-yellow-300">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-300">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
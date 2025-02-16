"use client"
import { motion } from 'framer-motion';
import { FaCreditCard, FaChartLine, FaShieldAlt, FaLightbulb } from 'react-icons/fa';

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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
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
            <button className="bg-teal-600 text-teal-900 px-8 py-4 rounded-full font-semibold hover:bg-teal-300 transition">
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

      {/* How It Works Section */}
      <section className="w-full py-20 bg-teal-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-teal-900"
          >
            How It Works
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8"
          >
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <div className="w-20 h-20 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-4 text-teal-900">Connect Your Accounts</h3>
              <p className="text-teal-700">Link your bank accounts and credit cards securely.</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <div className="w-20 h-20 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-4 text-teal-900">Get Insights</h3>
              <p className="text-teal-700">Receive personalized spending insights and recommendations.</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <div className="w-20 h-20 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-4 text-teal-900">Optimize & Protect</h3>
              <p className="text-teal-700">Optimize your credit card usage and protect your credit score.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-teal-900"
          >
            What Our Users Say
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <p className="text-teal-700 italic">
                "This platform helped me save 20% on my expenses and improved my credit score by 50 points!"
              </p>
              <p className="mt-6 font-semibold text-teal-900">— John Doe</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <p className="text-teal-700 italic">
                "I finally understand how to manage my credit cards without stress. Highly recommend!"
              </p>
              <p className="mt-6 font-semibold text-teal-900">— Jane Smith</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <p className="text-teal-700 italic">
                "The personalized recommendations are spot on. I found the perfect credit card for my needs."
              </p>
              <p className="mt-6 font-semibold text-teal-900">— Alex Johnson</p>
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
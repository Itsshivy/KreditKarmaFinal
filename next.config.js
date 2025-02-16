/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.squarespace-cdn.com', // For Smart Spending Insights
      'www.shutterstock.com', // For Activity & Reminders
      'www.cardexpert.in', // For CreditKey
      'images.unsplash.com', // For Debt Management
      'media.istockphoto.com', // For other images
      'plus.unsplash.com', // For the new image
    ],
  },
};

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'fade-in-up': 'fadeInUp 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      // Custom colors
      colors: {
        'finance-blue': '#0070f3',
        'finance-indigo': '#4f46e5',
        'finance-gradient-start': '#0070f3',
        'finance-gradient-end': '#4f46e5',
      },
      // Custom gradients
      backgroundImage: {
        'finance-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

module.exports = { nextConfig, tailwindConfig };
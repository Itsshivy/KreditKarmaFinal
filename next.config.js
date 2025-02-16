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

module.exports = nextConfig;

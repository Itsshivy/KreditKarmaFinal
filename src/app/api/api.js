// src/app/api/api.js

const BASE_URL = 'https://orgservice-prod.setu.co/v1/'; // Setu's sandbox URL
const ACCESS_TOKEN ="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJyX3FuMDZYenNoRHpXeXg3NUkwN1NsQkh3YzBtSUZKLU9pdm5sSjRnemhvIn0.eyJleHAiOjE3Mzk2MjQ1NTUsImlhdCI6MTczOTYyMjc1NSwianRpIjoiNzJiNGFkZDEtZDE1MS00ZThkLWFlYWItN2UzOTViYWU3YWYzIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLXYyLnNldHUuY28vcmVhbG1zL3NldHUiLCJzdWIiOiI2MWNhNGM5YS1kMGJjLTRlYjktODc2ZC0yZjVlOGRmYzAxMDYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiI3YWUwNTUzZi1mMTBmLTQ3NWQtODhlYS00YTVmOTRmZjM3MjMiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1zZXR1IiwiYm90QDQxOTM2NmViLTM2N2UtNDc4Zi04NzMxLTQ5YzgyNjI0YTg3ZSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInNjb3BlIjoiVEVTVCIsImNsaWVudEhvc3QiOiIzNS4yMDcuMjA3LjM2IiwiY2xpZW50SWQiOiI3YWUwNTUzZi1mMTBmLTQ3NWQtODhlYS00YTVmOTRmZjM3MjMiLCJjbGllbnRBZGRyZXNzIjoiMzUuMjA3LjIwNy4zNiJ9.MQrat7qp-ZdjPUkA_q4XW3rJxvG2SPImDhtoycznSIFtzWPrVW5K_BytuG_05dfDsJEBLSqdjSoUViW8fB4uOtxns_YeKS056vdiKXfXYuB6I0hdgxeB6xnI8sLXs8knH7v60fKCo3x6XKo25MJmU5kBdogwS0SZHRXXj8FrPCwOjvhbk7X_7lDJUNALqDFst3V3WC3CVeMzulvqHAbgn9PYuvGt3mtuMGciUQD6BMuvrFakLuxVlm5TeE5UJ7wfvEkD9mU2W0mYKSgXrNSchRDjHc9qIqGSR5LUjEpxGhP5SgSBhOwB1P7xJSGm0P9QQvArL66MdTu_2OJPA6nPjA"; // Replace with your actual access token

// Function to fetch transactions
export const fetchTransactions = async (consentId) => {
  try {
    const response = await fetch(`${BASE_URL}/consents/${consentId}/fetch`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

// Function to initiate consent (if needed)
export const initiateConsent = async () => {
  try {
    const response = await fetch(`${BASE_URL}/consents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        purpose: 'Spending Insights',
        customer: {
          id: 'user_123',
          name: 'John Doe',
        },
        accounts: ['bank_account_1'],
        dataLife: { unit: 'months', value: 3 },
        frequency: { unit: 'monthly', value: 1 },
        consentMode: 'VIEW',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to initiate consent');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error initiating consent:', error);
    throw error;
  }
};
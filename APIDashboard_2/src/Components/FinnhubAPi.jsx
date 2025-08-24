// File: StockDataAPI/src/FinnhubAPI.jsx

const API_KEY = import.meta.env_.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

// Helper function to make API calls
const fetchData = async (endpoint) => {
    const url = `${BASE_URL}${endpoint}&token=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return null; // Return null for non-200 responses
        }
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
    }
};

// get quote data
export const getQuote = async (ticker) => {
    try {
        return await fetchData(`/quote?symbol=${ticker}`);//'https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`);
    } catch (error) {
        console.error('Quote Error:', error);
        throw error;
    }
};

// get basic stock fundamentals
export const getFinancials = async (ticker) => {
    try {
        return await fetchData(`/stock/metric?symbol=${ticker}&metric=all`);
    } catch (error) {
        console.error('Financials API Error:', error);
        throw error;
    }
};

// get company news
export const getNews = async (ticker, startDate, endDate) => {
    try {
        return await fetchData(`/company-news?symbol=${ticker}&from=${startDate}&to=${endDate}`);
    } catch (error) {
        console.error('News API Error:', error);
        throw error;
    }
};

// get stock earnings
export const getEarnings = async (ticker) => {
    try {
        return await fetchData(`/stock/earnings?symbol=${ticker}`);
    } catch (error) {
        console.error('Earnings API Error:', error);
        throw error;
    }
};
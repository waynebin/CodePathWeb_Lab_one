// Alternative FinnhubAPI using fetch instead of the SDK

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

console.log('SimpleFinnhubAPI: Initializing with API key:', API_KEY ? 'Present' : 'Missing');

// get quote data using fetch
export const getQuoteSimple = async (ticker) => {
    try {
        console.log(`Fetching quote for ${ticker}...`);
        const url = `${BASE_URL}/quote?symbol=${ticker}&token=${API_KEY}`;
        console.log('Quote URL:', url.replace(API_KEY, 'API_KEY_HIDDEN'));
        
        const response = await fetch(url);
        console.log('Quote response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Quote data received:', data);
        return data;
    } catch (error) {
        console.error('Quote API Error:', error);
        throw error;
    }
};

// get basic stock fundamentals using fetch
export const getFinancialsSimple = async (ticker) => {
    try {
        console.log(`Fetching financials for ${ticker}...`);
        const url = `${BASE_URL}/stock/metric?symbol=${ticker}&metric=all&token=${API_KEY}`;
        console.log('Financials URL:', url.replace(API_KEY, 'API_KEY_HIDDEN'));
        
        const response = await fetch(url);
        console.log('Financials response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Financials data received:', data);
        return data;
    } catch (error) {
        console.error('Financials API Error:', error);
        throw error;
    }
};

// get company news using fetch
export const getNewsSimple = async (ticker, startDate, endDate) => {
    try {
        console.log(`Fetching news for ${ticker} from ${startDate} to ${endDate}...`);
        const url = `${BASE_URL}/company-news?symbol=${ticker}&from=${startDate}&to=${endDate}&token=${API_KEY}`;
        console.log('News URL:', url.replace(API_KEY, 'API_KEY_HIDDEN'));
        
        const response = await fetch(url);
        console.log('News response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('News data received:', data);
        return data;
    } catch (error) {
        console.error('News API Error:', error);
        throw error;
    }
};

// get earnings using fetch
export const getEarningsSimple = async (ticker) => {
    try {
        console.log(`Fetching earnings for ${ticker}...`);
        const url = `${BASE_URL}/stock/earnings?symbol=${ticker}&token=${API_KEY}`;
        console.log('Earnings URL:', url.replace(API_KEY, 'API_KEY_HIDDEN'));
        
        const response = await fetch(url);
        console.log('Earnings response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Earnings data received:', data);
        return data;
    } catch (error) {
        console.error('Earnings API Error:', error);
        throw error;
    }
};

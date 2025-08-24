import { useState, useEffect } from "react";
// import my custom API functions
import { getQuote, getFinancials, getNews, getEarnings } from './FinnhubAPi';

// Custom hook for getting stock quote data
export function useQuote(ticker) {
    const [quote, setQuote] = useState(null);
    const [quoteLoading, setQuoteLoading] = useState(false);
    const [quoteError, setQuoteError] = useState(null);

    useEffect(() => {
        if (!ticker) {
            return;
        }
        
        setQuoteLoading(true);
        setQuoteError(null);
        
        getQuote(ticker)
            .then((data) => {
                setQuote(data);
            })
            .catch((error) => {
                setQuoteError(error);
            })
            .finally(() => {
                setQuoteLoading(false);
            });
    }, [ticker]);

    return { quote, quoteLoading, quoteError };
}

// Custom hook for getting company financial data
export function useFinancials(ticker) {
    const [financials, setFinancials] = useState(null);
    const [financialsLoading, setFinancialsLoading] = useState(false);
    const [financialsError, setFinancialsError] = useState(null);

    useEffect(() => {
        if (!ticker) {
            return;
        }
        
        setFinancialsLoading(true);
        setFinancialsError(null);
        
        getFinancials(ticker)
            .then((data) => {
                setFinancials(data);
            })
            .catch((error) => {
                setFinancialsError(error);
            })
            .finally(() => {
                setFinancialsLoading(false);
            });
    }, [ticker]);

    return { financials, financialsLoading, financialsError };
}

// Custom hook for getting company news
export function useNews(ticker, startDate, endDate) {
    const [news, setNews] = useState(null);
    const [newsLoading, setNewsLoading] = useState(false);
    const [newsError, setNewsError] = useState(null);

    useEffect(() => {
        if (!ticker || !startDate || !endDate) {
            return;
        }
        
        setNewsLoading(true);
        setNewsError(null);
        
        getNews(ticker, startDate, endDate)
            .then((data) => {
                setNews(data);
            })
            .catch((error) => {
                setNewsError(error);
            })
            .finally(() => {
                setNewsLoading(false);
            });
    }, [ticker, startDate, endDate]);

    return { news, newsLoading, newsError };
}

// Custom hook for getting company earnings data
export function useEarnings(ticker) {
    const [earnings, setEarnings] = useState(null);
    const [earningsLoading, setEarningsLoading] = useState(false);
    const [earningsError, setEarningsError] = useState(null);

    useEffect(() => {
        if (!ticker) {
            return;
        }
        
        setEarningsLoading(true);
        setEarningsError(null);
        
        getEarnings(ticker)
            .then((data) => {
                setEarnings(data);
            })
            .catch((error) => {
                setEarningsError(error);
            })
            .finally(() => {
                setEarningsLoading(false);
            });
    }, [ticker]);

    return { earnings, earningsLoading, earningsError };
}
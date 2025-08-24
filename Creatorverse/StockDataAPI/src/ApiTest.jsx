import React, { useState } from 'react';
import { getQuote, getFinancials, getNews } from './FinnhubAPi';
import { getQuoteSimple, getFinancialsSimple, getNewsSimple } from './SimpleFinnhubAPI';

function ApiTest() {
    const [testResults, setTestResults] = useState({});
    const [loading, setLoading] = useState(false);

    const testQuote = async () => {
        setLoading(true);
        try {
            console.log('Testing getQuote for AAPL...');
            const result = await getQuote('AAPL');
            console.log('Quote result:', result);
            setTestResults(prev => ({ ...prev, quote: result }));
        } catch (error) {
            console.error('Quote error:', error);
            setTestResults(prev => ({ ...prev, quoteError: error.message }));
        }
        setLoading(false);
    };

    const testQuoteSimple = async () => {
        setLoading(true);
        try {
            console.log('Testing getQuoteSimple for AAPL...');
            const result = await getQuoteSimple('AAPL');
            console.log('Quote Simple result:', result);
            setTestResults(prev => ({ ...prev, quoteSimple: result }));
        } catch (error) {
            console.error('Quote Simple error:', error);
            setTestResults(prev => ({ ...prev, quoteSimpleError: error.message }));
        }
        setLoading(false);
    };

    const testFinancials = async () => {
        setLoading(true);
        try {
            console.log('Testing getFinancials for AAPL...');
            const result = await getFinancials('AAPL');
            console.log('Financials result:', result);
            setTestResults(prev => ({ ...prev, financials: result }));
        } catch (error) {
            console.error('Financials error:', error);
            setTestResults(prev => ({ ...prev, financialsError: error.message }));
        }
        setLoading(false);
    };

    const testFinancialsSimple = async () => {
        setLoading(true);
        try {
            console.log('Testing getFinancialsSimple for AAPL...');
            const result = await getFinancialsSimple('AAPL');
            console.log('Financials Simple result:', result);
            setTestResults(prev => ({ ...prev, financialsSimple: result }));
        } catch (error) {
            console.error('Financials Simple error:', error);
            setTestResults(prev => ({ ...prev, financialsSimpleError: error.message }));
        }
        setLoading(false);
    };

    const testNews = async () => {
        setLoading(true);
        try {
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            console.log('Testing getNews for AAPL...', { startDate, endDate });
            const result = await getNews('AAPL', startDate, endDate);
            console.log('News result:', result);
            setTestResults(prev => ({ ...prev, news: result }));
        } catch (error) {
            console.error('News error:', error);
            setTestResults(prev => ({ ...prev, newsError: error.message }));
        }
        setLoading(false);
    };

    const testNewsSimple = async () => {
        setLoading(true);
        try {
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            console.log('Testing getNewsSimple for AAPL...', { startDate, endDate });
            const result = await getNewsSimple('AAPL', startDate, endDate);
            console.log('News Simple result:', result);
            setTestResults(prev => ({ ...prev, newsSimple: result }));
        } catch (error) {
            console.error('News Simple error:', error);
            setTestResults(prev => ({ ...prev, newsSimpleError: error.message }));
        }
        setLoading(false);
    };

    const clearResults = () => {
        setTestResults({});
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>🧪 FinnhubAPI Test Dashboard</h2>
            <p>Testing both SDK-based and Fetch-based API calls</p>
            
            <div style={{ marginBottom: '20px' }}>
                <h3>SDK-based API Tests:</h3>
                <button onClick={testQuote} disabled={loading} style={{ marginRight: '10px', marginBottom: '5px' }}>
                    Test Quote API (SDK)
                </button>
                <button onClick={testFinancials} disabled={loading} style={{ marginRight: '10px', marginBottom: '5px' }}>
                    Test Financials API (SDK)
                </button>
                <button onClick={testNews} disabled={loading} style={{ marginRight: '10px', marginBottom: '5px' }}>
                    Test News API (SDK)
                </button>
                
                <h3>Fetch-based API Tests:</h3>
                <button onClick={testQuoteSimple} disabled={loading} style={{ marginRight: '10px', marginBottom: '5px' }}>
                    Test Quote API (Fetch)
                </button>
                <button onClick={testFinancialsSimple} disabled={loading} style={{ marginRight: '10px', marginBottom: '5px' }}>
                    Test Financials API (Fetch)
                </button>
                <button onClick={testNewsSimple} disabled={loading} style={{ marginRight: '10px', marginBottom: '5px' }}>
                    Test News API (Fetch)
                </button>
                
                <br />
                <button onClick={clearResults} style={{ marginTop: '10px', backgroundColor: '#f44336', color: 'white' }}>
                    Clear Results
                </button>
            </div>

            {loading && <p>⏳ Testing API...</p>}

            <div style={{ marginTop: '20px' }}>
                <h3>Test Results:</h3>
                <pre style={{ 
                    backgroundColor: '#f5f5f5', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    overflow: 'auto',
                    maxHeight: '400px',
                    fontSize: '12px'
                }}>
                    {JSON.stringify(testResults, null, 2)}
                </pre>
            </div>
        </div>
    );
}

export default ApiTest;

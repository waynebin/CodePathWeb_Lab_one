import React from "react";
import {
  useQuote, 
  useFinancials, 
  useNews, 
  useEarnings
} from './StockData.jsx';
import StockChart from './StockChart.jsx';
import './Stock.css';

function Stock({ticker}) {
  // Import available stock data attributes
  const {quote, quoteLoading, quoteError} = useQuote(ticker);
  const {financials, financialsLoading, financialsError} = useFinancials(ticker);
  const {earnings, earningsLoading, earningsError} = useEarnings(ticker);
  
  // For news, we need to provide date range
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const {news, newsLoading, newsError} = useNews(ticker, startDate, endDate);

  // State to control visibility of sections
  const [showChart, setShowChart] = React.useState(false);
  const [showQuote, setShowQuote] = React.useState(false);
  const [showFinancials, setShowFinancials] = React.useState(false);
  const [showEarnings, setShowEarnings] = React.useState(false);
  const [showNews, setShowNews] = React.useState(false);


  

  const loadingStyle = { color: '#666', fontStyle: 'italic' };
  const errorStyle = { color: '#d32f2f', fontWeight: 'bold' };

 

  return (
    <div className="stock-wrapper">
      <div className="stock-container">
        <h2 style={{color: '#1976d2', textAlign: 'center'}}>
          📈 Stock Analysis for {ticker}
        </h2>


        {/* Create buttons for each section once clicked then the section will be displayed */}
        <div className="button-container">
              <button onClick={() => setShowChart(!showChart)}>
                Chart
              </button>
              <button onClick={() => setShowQuote(!showQuote)}>
                Quote
              </button>
              <button onClick={() => setShowFinancials(!showFinancials)}>
                Financials
              </button>
              <button onClick={() => setShowEarnings(!showEarnings)}>
                Earnings
              </button>
              <button onClick={() => setShowNews(!showNews)}>
                News
              </button>

              {/* only show one section at a time when the button is clicked */}
              

        </div>
      </div>
      

      {/* CHART SECTION - Currently unavailable */}
      {showChart && (
        <div className="sectionStyle">
          <h3>📈 Stock Chart</h3>
          <p style={{color: '#666', fontStyle: 'italic'}}>
            Chart functionality is currently unavailable. The FinnhubAPI doesn't include historical data endpoints.
            Consider adding a different API for historical stock data to enable charting.
          </p>
        </div>
      )}

      {/* Quote Section */} 
      {/* turning the quote section on and off and displaying the quote data */}
      {showQuote && (
        <div className="sectionStyle">
          <h3>📈 Live Quote Data</h3>
          {quoteLoading && <p style={loadingStyle}>Loading quote data...</p>}
          {quoteError && <p style={errorStyle}>Error: {quoteError.message}</p>}
          {quote && (
            <div>
              <p><strong>Symbol:</strong> {quote.symbol || ticker}</p>
              <p><strong>Current Price:</strong> ${quote.c || 'N/A'}</p>
              <p><strong>Change:</strong> {quote.d || 'N/A'}</p>
              <p><strong>Percent Change:</strong> {quote.dp || 'N/A'}%</p>
              <p><strong>High:</strong> ${quote.h || 'N/A'}</p>
              <p><strong>Low:</strong> ${quote.l || 'N/A'}</p>
              <p><strong>Open:</strong> ${quote.o || 'N/A'}</p>
              <p><strong>Previous Close:</strong> ${quote.pc || 'N/A'}</p>
            </div>
          )}
          {!quoteLoading && !quoteError && !quote && (
            <p>No quote data available</p>
          )}
        </div>
      )}

      {/* Financial Data Section */}
      {showFinancials && (
        <div className="sectionStyle">
          <h3>💼 Financial Information</h3>
          {financialsLoading && <p style={loadingStyle}>Loading financial data...</p>}
          {financialsError && <p style={errorStyle}>Error: {financialsError.message}</p>}
          {financials && (
            <div>
              <p><strong>Company:</strong> {ticker}</p>
              <pre style={{fontSize: '12px', overflow: 'auto', maxHeight: '200px'}}>
                {JSON.stringify(financials, null, 2)}
              </pre>
            </div>
          )}
          {!financialsLoading && !financialsError && !financials && (
            <p>No financial data available</p>
          )}
        </div>
      )}

      {/* Earnings Section */}
      {showEarnings && (
        <div className="sectionStyle">
          <h3>💰 Earnings Information</h3>
          {earningsLoading && <p style={loadingStyle}>Loading earnings data...</p>}
          {earningsError && <p style={errorStyle}>Error: {earningsError.message}</p>}
          {earnings && (
            <div>
              <p><strong>Company:</strong> {ticker}</p>
              <pre style={{fontSize: '12px', overflow: 'auto', maxHeight: '200px'}}>
                {JSON.stringify(earnings, null, 2)}
              </pre>
            </div>
          )}
          {!earningsLoading && !earningsError && !earnings && (
            <p>No earnings data available</p>
          )}
        </div>
      )}

      {/* News Section */}
      {showNews && (
        <div className="sectionStyle">
          <h3>📰 Latest News</h3>
          {newsLoading && <p style={loadingStyle}>Loading news data...</p>}
          {newsError && <p style={errorStyle}>Error: {newsError.message}</p>}
          {news && Array.isArray(news) && news.length > 0 && (
            <div>
              {news.slice(0, 3).map((article, index) => (
                <div key={index} style={{marginBottom: '15px', padding: '10px', backgroundColor: '#f0f8ff', borderLeft: '3px solid #1976d2'}}>
                  <h4 style={{margin: '0 0 5px 0'}}>{article.headline || 'No Title'}</h4>
                  <p style={{margin: '5px 0', fontSize: '14px'}}>{article.summary || 'No description available'}</p>
                  <p style={{margin: '5px 0', fontSize: '12px', color: '#666'}}>
                    Published: {new Date(article.datetime * 1000).toLocaleDateString() || 'Unknown date'}
                  </p>
                  {article.url && (
                    <a href={article.url} target="_blank" rel="noopener noreferrer" style={{color: '#1976d2'}}>
                      Read full article →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
          {!newsLoading && !newsError && (!news || !Array.isArray(news) || news.length === 0) && (
            <p>No news data available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Stock;

// This component is used to display stock information.
// It can be used to show stock prices, trends, and other related data.
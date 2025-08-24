//this is the detailed view component
import React, { useEffect, useState } from "react";
import "../CssStyle/DetailView.css";
import { useParams } from "react-router";
import { Link } from "react-router";

const API_TOKEN = import.meta.env.VITE_FINNHUB_API_KEY;

// Fetch all annual series and metrics for a given symbol
async function fetchMetricsForSymbol(symbol) {
  const res = await fetch(
    `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${API_TOKEN}`
  );
  if (!res.ok) {
    throw new Error(`Metric fetch failed for ${symbol}: ${res.status}`);
  }

  const data = await res.json();

  // Merge annual series arrays and flat metrics into one object
  return {
    symbol,
    ...data.series.annual,
    ...data.metric,
  };
}

export default function DetailView() {
  const { symbol } = useParams();
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    const load = async () => {
      try {
        const result = await fetchMetricsForSymbol(symbol);
        setMetrics(result);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    load();
  }, [symbol]);

  if (error) return <div>Error: {error}</div>;
  if (!metrics) return <div>Loading...</div>;

  // Destructure the arrays for easier table rendering
  const { currentRatio = [], salesPerShare = [], netMargin = [] } = metrics;

  return (
    <div className="detail-view">
     <div className="home-button">
        <Link to="/">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
      <h2>{metrics.symbol}</h2>

      {/* Render your chart component */}
      {/* <Chart data={metrics} /> */}

      {/* Example HTML table for annual series */}
      <table>
        <thead>
          <tr>
            <th>Period</th>
            <th>Current Ratio</th>
            <th>Sales / Share</th>
            <th>Net Margin</th>
          </tr>
        </thead>
        <tbody>
          {currentRatio.map((entry, index) => (
            <tr key={entry.period}>
              <td>{entry.period}</td>
              <td>{entry.v}</td>
              <td>{salesPerShare[index]?.v}</td>
              <td>{netMargin[index]?.v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display flat metrics */}
      <div className="metrics-list">
        <h3>Additional Metrics</h3>
        <ul>
          <li>10‑Day Avg Volume: {metrics["10DayAverageTradingVolume"]}</li>
          <li>52‑Week High: {metrics["52WeekHigh"]}</li>
          <li>52‑Week Low: {metrics["52WeekLow"]}</li>
          <li>52‑Week Low Date: {metrics["52WeekLowDate"]}</li>
          <li>52‑Week Daily Return: {metrics["52WeekPriceReturnDaily"]}%</li>
          <li>Beta: {metrics.beta}</li>
        </ul>
      </div>

      
    </div>
  );
}

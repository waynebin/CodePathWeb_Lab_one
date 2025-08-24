import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts';





export default function Chart({ metrics }) {
  // Destructure the arrays, with safe defaults
  const {
    currentRatio = [],
    salesPerShare = [],
    netMargin = [],
    ...flatMetrics
  } = metrics;

  // Build the data for the line chart
  const lineData = currentRatio.map((entry, idx) => ({
    period: entry.period,
    currentRatio: entry.v,
    salesPerShare: salesPerShare[idx]?.v,
    netMargin: netMargin[idx]?.v
  }));

  // Build the data for the bar chart
  const barData = [
    { name: '10D Avg Volume', value: flatMetrics['10DayAverageTradingVolume'] },
    { name: '52W High',       value: flatMetrics['52WeekHigh'] },
    { name: '52W Low',        value: flatMetrics['52WeekLow'] },
    { name: 'Beta',           value: flatMetrics.beta }
  ];

  return (
    <>
      <div className="chart-wrapper">
        <h3>Annual Financial Metrics Over Time</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={lineData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="currentRatio" name="Current Ratio" />
            <Line type="monotone" dataKey="salesPerShare" name="Sales / Share" />
            <Line type="monotone" dataKey="netMargin" name="Net Margin" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-wrapper">
        <h3>Key Stock Metrics</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}



import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const StockChart = ({ data, ticker, width = 600, height = 300 }) => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Create the chart
        const chart = createChart(chartContainerRef.current, {
            width: width,
            height: height,
            layout: {
                background: { color: '#ffffff' },
                textColor: '#333',
            },
            grid: {
                vertLines: { color: '#e1e1e1' },
                horzLines: { color: '#e1e1e1' },
            },
            crosshair: {
                mode: 1, // Normal crosshair mode
            },
            rightPriceScale: {
                borderColor: '#cccccc',
            },
            timeScale: {
                borderColor: '#cccccc',
                timeVisible: true,
                secondsVisible: false,
            },
        });

        // Add a candlestick series
        const candlestickSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        // Store references
        chartRef.current = chart;
        seriesRef.current = candlestickSeries;

        // Handle resize
        const handleResize = () => {
            if (chartRef.current && chartContainerRef.current) {
                chartRef.current.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                });
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
                seriesRef.current = null;
            }
        };
    }, [width, height]);

    // Update chart data when data prop changes
    useEffect(() => {
        if (seriesRef.current && data && data.length > 0) {
            // Convert data to the format expected by lightweight-charts
            const formattedData = data.map(item => ({
                time: item.time || item.date || item.timestamp,
                open: parseFloat(item.open || item.o || 0),
                high: parseFloat(item.high || item.h || 0),
                low: parseFloat(item.low || item.l || 0),
                close: parseFloat(item.close || item.c || 0),
            }));

            seriesRef.current.setData(formattedData);
        }
    }, [data]);

    return (
        <div style={{ width: '100%' }}>
            <h3 style={{ textAlign: 'center', margin: '10px 0' }}>
                📈 {ticker} Price Chart
            </h3>
            <div 
                ref={chartContainerRef} 
                style={{ 
                    width: '100%', 
                    height: `${height}px`,
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                }}
            />
        </div>
    );
};

export default StockChart;

import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';
import './NativeChart.css';

export default function NativeChart({ contractAddress }) {
  const chartContainerRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let chart;
    let isMounted = true;
    let resizeListener;
    
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        
        // Step 1: Get pair address from DexScreener
        const dexRes = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`);
        const dexData = await dexRes.json();
        
        if (!dexData.pairs || dexData.pairs.length === 0) {
           throw new Error("No trading pairs found yet");
        }
        
        // Take the highest liquidity/volume pair (usually the first one)
        const pair = dexData.pairs[0];
        const pairAddress = pair.pairAddress;
        
        // Step 2: Fetch OHLCV data from GeckoTerminal
        const ohlcvRes = await fetch(`https://api.geckoterminal.com/api/v2/networks/solana/pools/${pairAddress}/ohlcv/hour?limit=100`);
        if (!ohlcvRes.ok) {
            throw new Error("Rate limited or no chart data");
        }
        const ohlcvData = await ohlcvRes.json();
        
        if (!ohlcvData.data || !ohlcvData.data.attributes || !ohlcvData.data.attributes.ohlcv_list) {
            throw new Error("No chart data available");
        }
        
        let multiplier = 1;
        if (pair.fdv && pair.priceUsd) {
            multiplier = Number(pair.fdv) / Number(pair.priceUsd);
        } else {
            multiplier = 1000000000; // typical meme coin total supply fallback
        }
        
        // Gecko returns newest first: [timestamp, open, high, low, close, volume]
        // lightweight-charts needs oldest first and strictly unique times
        const rawData = ohlcvData.data.attributes.ohlcv_list;
        
        const uniqueDataMap = new Map();
        rawData.forEach(item => {
            uniqueDataMap.set(Number(item[0]), {
                time: Number(item[0]),
                open: Number(item[1]) * multiplier,
                high: Number(item[2]) * multiplier,
                low: Number(item[3]) * multiplier,
                close: Number(item[4]) * multiplier
            });
        });
        
        const formattedData = Array.from(uniqueDataMap.values()).sort((a, b) => a.time - b.time);
        
        if (formattedData.length === 0) {
            throw new Error("No chart data points found.");
        }
        
        if (!isMounted) return;
        
        // Render chart
        if (chartContainerRef.current) {
            // Clear existing chart if any
            chartContainerRef.current.innerHTML = '';
            
            chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: '#131722' },
                    textColor: '#d1d4dc',
                },
                grid: {
                    vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
                    horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
                },
                rightPriceScale: {
                    borderVisible: false,
                },
                timeScale: {
                    borderVisible: false,
                    timeVisible: true,
                },
                width: chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientHeight || 400,
            });
            
            const minPrice = Math.min(...formattedData.map(d => d.low));
            let minMove = 1;
            if (minPrice > 10000000) minMove = 10000;
            else if (minPrice > 1000000) minMove = 1000;
            else if (minPrice > 100000) minMove = 100;
            else if (minPrice > 10000) minMove = 10;
            
            const candlestickSeries = chart.addSeries(CandlestickSeries, {
                upColor: '#26a69a',
                downColor: '#ef5350',
                borderVisible: false,
                wickUpColor: '#26a69a',
                wickDownColor: '#ef5350',
                priceFormat: {
                    type: 'custom',
                    minMove: minMove,
                    formatter: price => {
                        if (price >= 1000000000) return (price / 1000000000).toFixed(2) + 'B';
                        if (price >= 1000000) return (price / 1000000).toFixed(2) + 'M';
                        if (price >= 1000) return (price / 1000).toFixed(1) + 'K';
                        return price.toFixed(2);
                    },
                },
            });
            
            candlestickSeries.setData(formattedData);
            
            // Handle resize
            resizeListener = () => {
                if (chartContainerRef.current && chart) {
                    chart.applyOptions({ width: chartContainerRef.current.clientWidth });
                }
            };
            
            window.addEventListener('resize', resizeListener);
            chart.timeScale().fitContent();
            
            setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
            console.error("Chart load error:", err);
            setError(err.message);
            setLoading(false);
        }
      }
    }
    
    loadData();
    
    return () => {
        isMounted = false;
        if (resizeListener) {
            window.removeEventListener('resize', resizeListener);
        }
        if (chart) {
            chart.remove();
        }
    };
  }, [contractAddress]);
  
  if (error) {
    return (
        <div className="native-chart-error">
            <p>Chart data unavailable</p>
            <span className="error-detail">{error}</span>
        </div>
    );
  }
  
  return (
    <div className="native-chart-wrapper">
        {loading && (
            <div className="native-chart-loading">
                <div className="loader-spinner"></div>
                <p>Loading market data...</p>
            </div>
        )}
        <div 
            ref={chartContainerRef} 
            className="native-chart-container" 
            style={{ opacity: loading ? 0 : 1, width: '100%', height: '100%', minHeight: '400px' }}
        />
    </div>
  );
}

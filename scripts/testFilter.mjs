import { mockStocks } from './src/data/stocks.js';

const pumpStocks = mockStocks.filter(s => !!s.contract);
console.log(`Found ${pumpStocks.length} pump stocks:`, pumpStocks.map(s => s.ticker));

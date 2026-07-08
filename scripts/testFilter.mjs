import { mockStocks } from '../src/data/stocks.js';

const cbe = mockStocks.find(s => s.ticker === 'CBE');
console.log('CBE Stock:', cbe);

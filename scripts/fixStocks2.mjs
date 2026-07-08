import fs from 'fs/promises';
import path from 'path';

async function run() {
  const stocksFile = path.join(process.cwd(), 'src/data/stocks.js');
  let content = await fs.readFile(stocksFile, 'utf8');

  const oldMakeStockRegex = /export function makeStock\([\s\S]*?export const bawsaqStocks/m;
  
  const newMakeStock = `export function makeStock({ ticker, name, exchange, sector, desc }) {
  // Use a pseudo-random seed based on ticker so numbers are stable and don't change every reload
  let seed = 0;
  for (let i = 0; i < ticker.length; i++) {
    seed += ticker.charCodeAt(i);
  }
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const price = 10 + random() * 990; 
  const volume = 10000 + random() * 900000;
  const changePercent = (random() * 10 - 5).toFixed(2); 
  const history = Array.from({ length: 30 }, (_, i) => ({
    time: \`\${i}d ago\`,
    price: price * (1 + (random() * 0.2 - 0.1))
  })).reverse();
  const sentimentScore = Math.floor(random() * 100);
  let sentiment = 'Neutral';
  if (sentimentScore > 70) sentiment = 'Bullish';
  if (sentimentScore < 30) sentiment = 'Bearish';

  const formatNum = (num) => {
    if (num >= 1e9) return '$' + (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return '$' + (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return '$' + (num / 1e3).toFixed(2) + 'K';
    return '$' + num.toFixed(2);
  };
  
  const rawMcap = price * volume * 100;

  return {
    id: ticker,
    ticker,
    name,
    exchange,
    sector,
    price: formatNum(price),
    changePercent,
    change24h: changePercent,
    volume: volume,
    volume24h: formatNum(volume * price * 0.05),
    marketCap: formatNum(rawMcap),
    history,
    desc,
    sentiment,
    sentimentScore,
    txns24h: Math.floor(volume / 400).toLocaleString(),
    buys: (random() * 5 + 1).toFixed(1),
    sells: (random() * 5 + 1).toFixed(1),
    buyTax: 0,
    sellTax: 0,
    liquidity: formatNum(rawMcap * 0.1),
    holders: Math.floor(volume / 50).toLocaleString(),
    contract: \`0x\${Math.floor(random() * 0xffffffff).toString(16).padStart(8, '0').toUpperCase()}...BWSQ\`
  };
}

export const bawsaqStocks`;

  content = content.replace(oldMakeStockRegex, newMakeStock);
  await fs.writeFile(stocksFile, content);
  console.log('Fixed syntax of makeStock.');
}

run().catch(console.error);

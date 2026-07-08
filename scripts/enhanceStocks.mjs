import fs from 'fs/promises';
import path from 'path';

const sentiments = [
  "Strong fundamentals and recent institutional accumulation make {name} a prime target for value investors seeking exposure to the {sector} sector.",
  "Retail traders have been piling into {ticker} on rumors of an impending buyout. High risk, high reward as momentum builds.",
  "A blue-chip staple on the {exchange}. {name} offers consistent dividends and stable growth, acting as a hedge against broader market volatility.",
  "Technical indicators show a massive bullish divergence for {ticker}. Day traders are actively buying the dip ahead of a potential breakout.",
  "Wall Street bets are heavily skewed towards the upside for {name}, predicting a massive earnings beat next quarter.",
  "Despite recent market turbulence, {ticker} has maintained strong support levels. Smart money is steadily adding to their positions.",
  "A true market disruptor in the {sector} space. {name} continues to aggressively capture market share, making it a favorite among growth investors.",
  "Analysts have recently upgraded {name} to a 'Strong Buy', citing robust cash flow and a dominant position on the {exchange}.",
  "With the recent short interest peaking, {ticker} is primed for a massive short squeeze. Retail volume is surging.",
  "Regarded as a safe haven asset on the {exchange}, {name} continues to attract capital from risk-averse investors during uncertain times.",
  "Heavy options trading activity suggests a major catalyst is on the horizon for {ticker}. Volatility traders are positioning accordingly.",
  "A dark horse in the {sector} industry. {name} has been quietly securing major contracts, leading to quiet but aggressive accumulation by funds."
];

async function run() {
  const stocksFile = path.join(process.cwd(), 'src/data/stocks.js');
  let content = await fs.readFile(stocksFile, 'utf8');

  // Match the makeStock calls
  const regex = /makeStock\(\{\s*ticker:\s*'([^']+)',\s*name:\s*'([^']+)',\s*exchange:\s*'([^']+)',\s*sector:\s*'([^']+)',\s*desc:\s*("([^"\\]|\\.)*"|'([^'\\]|\\.)*')\s*\}\)/g;

  let matchCount = 0;
  content = content.replace(regex, (match, ticker, name, exchange, sector, descStr) => {
    matchCount++;
    
    // Pick a deterministic but pseudo-random sentiment based on ticker
    let seed = 0;
    for (let i = 0; i < ticker.length; i++) seed += ticker.charCodeAt(i);
    const template = sentiments[seed % sentiments.length];
    
    const sentimentText = template
      .replace(/{name}/g, name)
      .replace(/{ticker}/g, ticker)
      .replace(/{exchange}/g, exchange)
      .replace(/{sector}/g, sector);

    // Unquote the original desc, append, and requote
    // It's tricky with escaped quotes. It's safer to parse the JSON string or use eval cautiously
    let originalDesc = "";
    try {
      originalDesc = JSON.parse(descStr);
    } catch(e) {
      // If it's single quoted or has issues, fallback to manual strip
      originalDesc = descStr.substring(1, descStr.length - 1).replace(/\\"/g, '"').replace(/\\'/g, "'");
    }

    // Check if it already has Market Sentiment
    if (originalDesc.includes("MARKET SENTIMENT:")) {
      return match;
    }

    const newDesc = originalDesc.trim() + "\\n\\n📈 MARKET SENTIMENT: " + sentimentText;
    
    // Re-stringify
    const safeDesc = JSON.stringify(newDesc);
    const nameStr = name.replace(/'/g, "\\'");
    
    return `makeStock({ ticker: '${ticker}', name: '${nameStr}', exchange: '${exchange}', sector: '${sector}', desc: ${safeDesc} })`;
  });

  await fs.writeFile(stocksFile, content);
  console.log(`Updated ${matchCount} stocks with market sentiments.`);
}

run().catch(console.error);

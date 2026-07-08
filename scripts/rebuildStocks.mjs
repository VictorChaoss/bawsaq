import fs from 'fs/promises';
import path from 'path';
import * as cheerio from 'cheerio';

const STOCKS_FILE = path.join(process.cwd(), 'src/data/stocks.js');
const SCRAPED_FILE = path.join(process.cwd(), 'scraped_stocks.json');

async function searchWiki(query) {
  const searchUrl = `https://gta.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json`;
  try {
    const res = await fetch(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await res.json();
    if (data.query && data.query.search && data.query.search.length > 0) {
      // Prioritize results with "HD Universe" or "company"
      const exactMatch = data.query.search.find(s => s.title.toLowerCase() === query.toLowerCase());
      if (exactMatch) return exactMatch.title;
      
      const companyMatch = data.query.search.find(s => s.title.includes('company') || s.title.includes('HD Universe'));
      if (companyMatch) return companyMatch.title;
      
      return data.query.search[0].title;
    }
  } catch (err) {
    console.error(`Search failed for ${query}:`, err.message);
  }
  return null;
}

async function fetchWikiIntro(title) {
  if (!title) return null;
  const url = `https://gta.fandom.com/api.php?action=parse&page=${encodeURIComponent(title)}&prop=text&format=json`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await res.json();
    if (data.error) return null;
    
    const html = data.parse.text['*'];
    const $ = cheerio.load(html);
    
    const paras = [];
    $('.mw-parser-output > p').each((i, el) => {
      const text = $(el).text().trim();
      // Ignore empty paragraphs, coordinate/infobox artifacts, and very short texts
      if (text && !text.match(/^\[\d+\]$/) && text.length > 40 && !text.includes('Coordinates')) {
        let cleanText = text.replace(/\[\d+\]/g, ''); // remove footnote citations
        paras.push(cleanText);
      }
    });
    
    if (paras.length > 0) {
      return paras.join('\\n\\n');
    }
  } catch (err) {
    console.error(`Error fetching ${title}:`, err.message);
  }
  return null;
}

async function run() {
  const scraped = JSON.parse(await fs.readFile(SCRAPED_FILE, 'utf8'));
  const allStocks = [...scraped.bawsaq, ...scraped.lcn];
  
  console.log(`Found ${allStocks.length} stocks to rebuild.`);
  
  const bawsaqLines = [];
  const lcnLines = [];
  
  for (const item of allStocks) {
    console.log(`Fetching desc for ${item.name} (${item.ticker})...`);
    
    let desc = null;
    // 1. Try exact name
    desc = await fetchWikiIntro(item.name);
    
    // 2. Try HD Universe suffix
    if (!desc) desc = await fetchWikiIntro(`${item.name} (HD Universe)`);
    
    // 3. Try company suffix
    if (!desc) desc = await fetchWikiIntro(`${item.name} (company)`);
    
    // 4. Try searching the wiki if we still don't have it
    if (!desc) {
      console.log(`  -> Exact name failed. Searching wiki for "${item.name}"...`);
      const searchTitle = await searchWiki(item.name);
      if (searchTitle) {
        console.log(`  -> Found alternative title: "${searchTitle}"`);
        desc = await fetchWikiIntro(searchTitle);
      }
    }
    
    // 5. Hard fallback
    if (!desc) {
      console.log(`  -> ALL FETCHES FAILED for ${item.name}. Using fallback.`);
      desc = `${item.name} is a prominent corporation listed on the ${item.exchange} exchange within the state of San Andreas. The company operates across multiple sectors in Los Santos and Blaine County.`;
    }
    
    // Default sector
    item.sector = 'Diversified';
    
    const safeDesc = JSON.stringify(desc);
    const nameStr = item.name.replace(/'/g, "\\'");
    
    const line = `  makeStock({ ticker: '${item.ticker}', name: '${nameStr}', exchange: '${item.exchange}', sector: '${item.sector}', desc: ${safeDesc} }),`;
    
    if (item.exchange === 'BAWSAQ') {
      bawsaqLines.push(line);
    } else {
      lcnLines.push(line);
    }
    
    // Rate limit
    await new Promise(r => setTimeout(r, 200));
  }
  
  const topLogic = `export function makeStock({ ticker, name, exchange, sector, desc }) {
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

export const bawsaqStocks = [
`;

  const midLogic = `];

// ── LCN stocks (GTA V offline exchange) ───────────────────────
export const lcnStocks = [
`;

  const endLogic = `];

export const nativeToken = makeStock({ ticker: 'BSQ', name: '$BAWSAQ Token', exchange: 'NATIVE', sector: 'Ecosystem', desc: 'The native token of the BAWSAQ terminal. $BAWSAQ accrues value through trading fees and network activity.' });

export const mockStocks = [
  nativeToken,
  ...[...bawsaqStocks, ...lcnStocks].sort((a, b) => a.name.localeCompare(b.name))
];
`;

  const finalCode = topLogic + bawsaqLines.join('\n') + '\n' + midLogic + lcnLines.join('\n') + '\n' + endLogic;
  
  await fs.writeFile(STOCKS_FILE, finalCode);
  console.log('Successfully rebuilt stocks.js with all stocks and wiki lore!');
}

run().catch(console.error);

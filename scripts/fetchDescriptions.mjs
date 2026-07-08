import fs from 'fs/promises';
import path from 'path';
import * as cheerio from 'cheerio';

const STOCKS_FILE = path.join(process.cwd(), 'src/data/stocks.js');

async function fetchWikiIntro(title) {
  const url = `https://gta.fandom.com/api.php?action=parse&page=${encodeURIComponent(title)}&prop=text&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const data = await res.json();
  if (!data.parse || !data.parse.text) return null;
  
  const html = data.parse.text['*'];
  const $ = cheerio.load(html);
  
  let intro = '';
  // Try to find the first few paragraphs
  $('.mw-parser-output > p').each((i, el) => {
    const text = $(el).text().replace(/\[\d+\]/g, '').trim(); // Remove citations like [1]
    if (text.length > 50) { // Ignore small empty or trailing paragraphs
      if (intro.length > 0) intro += ' '; // Join with space for a solid block, or we can use \n
      intro += text;
      // Stop after ~2 paragraphs or ~500 chars
      if (intro.length > 600) return false;
    }
  });
  
  // Clean up whitespace
  intro = intro.replace(/\s+/g, ' ').trim();
  
  // If we couldn't find a paragraph, fallback
  return intro || null;
}

async function run() {
  let code = await fs.readFile(STOCKS_FILE, 'utf8');
  
  // We will iterate over all stocks defined in stocks.js
  const regex = /makeStock\(\{\s*ticker:\s*'([^']+)',\s*name:\s*'([^']+)'/g;
  let match;
  
  let namesToFetch = [];
  while ((match = regex.exec(code)) !== null) {
    namesToFetch.push({ ticker: match[1], name: match[2] });
  }
  
  for (const item of namesToFetch) {
    if (item.ticker === 'BSQ') continue; // Skip native token
    
    let searchTitle = item.name;
    // Map known weird names
    if (searchTitle.includes('Benny')) searchTitle = 'Benny\'s Original Motor Works';
    if (searchTitle === 'Beta Pharmaceuticals' || searchTitle === 'Betta Pharmaceuticals') searchTitle = 'Betta Pharmaceuticals';
    if (searchTitle === 'Bullhead Attorneys') searchTitle = 'Bullhead';
    if (searchTitle === 'Fruit Computers') searchTitle = 'Fruit Computers';
    if (searchTitle === 'Pißwasser') searchTitle = 'Pißwasser';
    if (searchTitle === 'Rwynns Corporation') searchTitle = 'Rwynns';
    if (searchTitle === 'Tobacco') searchTitle = 'Tobacco (company)';
    if (searchTitle === 'Cluckin\\\' Bell' || searchTitle.includes('Cluckin')) searchTitle = 'Cluckin\' Bell';
    
    console.log(`Fetching desc for ${item.name} (${item.ticker})...`);
    let desc = await fetchWikiIntro(searchTitle);
    
    if (!desc) {
      // try first word
      const altTitle = searchTitle.split(' ')[0];
      console.log(`  Not found. Trying ${altTitle}...`);
      desc = await fetchWikiIntro(altTitle);
    }
    
    if (desc) {
      console.log(`  Found! length: ${desc.length}`);
      // Replace in code
      // We need to find the `desc: '...'` or `desc: "..."` line for this specific ticker.
      // Easiest is to find the block for this ticker and replace its desc.
      const blockRegex = new RegExp(`(ticker:\\s*'${item.ticker}'[\\s\\S]*?desc:\\s*)(['"\`])([\\s\\S]*?)\\2`, 'g');
      
      // Escape single quotes in desc
      const safeDesc = desc.replace(/'/g, "\\'");
      code = code.replace(blockRegex, `$1'$2$safeDesc$2'`);
      // Wait, replacing with `$1'$safeDesc'` is safer.
      const finalRegex = new RegExp(`(ticker:\\s*'${item.ticker}'[\\s\\S]*?desc:\\s*)['"\`][\\s\\S]*?['"\`]`, 'g');
      code = code.replace(finalRegex, `$1'${safeDesc}'`);
    } else {
      console.log(`  FAILED to find description.`);
    }
    
    // Add a small delay to avoid hitting rate limits
    await new Promise(r => setTimeout(r, 200));
  }
  
  await fs.writeFile(STOCKS_FILE, code);
  console.log('Finished updating stocks.js!');
}

run();

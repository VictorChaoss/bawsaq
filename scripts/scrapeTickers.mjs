import * as cheerio from 'cheerio';
import fs from 'fs/promises';

async function fetchStocks(page, exchange) {
  const url = `https://gta.fandom.com/api.php?action=parse&page=${page}&prop=text&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const data = await res.json();
  const html = data.parse.text['*'];
  const $ = cheerio.load(html);
  
  const stocks = [];
  $('table tbody tr').each((i, row) => {
    const cols = $(row).find('td');
    if (cols.length >= 2) {
      let tickerHtml = $(cols[0]).html() || '';
      let tickerMatch = tickerHtml.match(/<b>(.*?)<\/b>/);
      let ticker = tickerMatch ? tickerMatch[1] : $(cols[0]).text().trim();
      let name = $(cols[1]).text().trim().replace(/\[\d+\]/g, '');
      if (ticker && name && ticker.length <= 5 && !ticker.includes(' ')) {
        stocks.push({ ticker, name, exchange });
      }
    }
  });
  return stocks;
}

async function run() {
  const bawsaq = await fetchStocks('Bawsaq.com', 'BAWSAQ');
  const lcn = await fetchStocks('Liberty_City_National_Exchange', 'LCN');
  
  const bawsaqClean = [...new Map(bawsaq.map(s => [s.ticker, s])).values()];
  const lcnClean = [...new Map(lcn.map(s => [s.ticker, s])).values()];
  
  console.log(`Found ${bawsaqClean.length} BAWSAQ stocks and ${lcnClean.length} LCN stocks.`);
  
  await fs.writeFile('scraped_stocks.json', JSON.stringify({ bawsaq: bawsaqClean, lcn: lcnClean }, null, 2));
}

run().catch(console.error);

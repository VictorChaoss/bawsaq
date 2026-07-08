import fs from 'fs/promises';
import path from 'path';

async function mapImages() {
  const scrapedRaw = await fs.readFile('scraped_stocks.json', 'utf8');
  const scraped = JSON.parse(scrapedRaw);
  const allStocks = [...scraped.bawsaq, ...scraped.lcn];

  const files = await fs.readdir('public/explore_photos');
  const images = files.filter(f => f !== '.DS_Store');

  const mapping = {};

  for (const stock of allStocks) {
    let nameClean = stock.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    let tickerClean = stock.ticker.toLowerCase();
    
    let bestMatch = null;
    let maxScore = 0;
    
    for (const img of images) {
      let imgClean = img.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      let score = 0;
      if (imgClean.includes(nameClean)) {
        score += 10;
      } else if (nameClean.includes(imgClean.replace(/webp|svg|png|jpg/g, ''))) {
        score += 8;
      } else {
        // substring match
        let longestCommon = 0;
        for (let i = 0; i < nameClean.length; i++) {
          for (let j = i + 1; j <= nameClean.length; j++) {
            let sub = nameClean.substring(i, j);
            if (sub.length > 3 && imgClean.includes(sub)) {
              if (sub.length > longestCommon) longestCommon = sub.length;
            }
          }
        }
        score += longestCommon;
      }
      
      if (score > maxScore && score > 3) {
        maxScore = score;
        bestMatch = img;
      }
    }
    
    if (bestMatch) {
      mapping[stock.ticker] = `/explore_photos/${encodeURIComponent(bestMatch)}`;
    }
  }

  const jsContent = `export const stockImageMap = ${JSON.stringify(mapping, null, 2)};\n`;
  await fs.writeFile('src/data/imageMap.js', jsContent);
  console.log(`Mapped ${Object.keys(mapping).length} out of ${allStocks.length} stocks.`);
}

mapImages().catch(console.error);

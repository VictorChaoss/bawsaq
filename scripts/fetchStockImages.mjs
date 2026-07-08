import fs from 'fs/promises';
import path from 'path';

// The raw data from stocks.js. Since we can't easily import ES modules dynamically without setup, let's just parse the file or use a subset.
const STOCKS_FILE = path.join(process.cwd(), 'src/data/stocks.js');

async function extractOgImage(title) {
  try {
    const url = `https://gta.fandom.com/wiki/${encodeURIComponent(title)}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const html = await res.text();
    
    // Try to find the infobox image first, as it's usually the best representation
    let match = html.match(/class="pi-image-thumbnail"[^>]*src="([^"]+)"/);
    if (match) return match[1].split('/revision')[0]; // Strip scaling params for full res
    
    // Fallback to og:image
    match = html.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) {
        let imgUrl = match[1];
        if (imgUrl.includes('Site-logo')) return null; // Ignore default Fandom logo
        return imgUrl.split('/revision')[0];
    }
    return null;
  } catch (e) {
    return null;
  }
}

async function run() {
  const code = await fs.readFile(STOCKS_FILE, 'utf8');
  
  // Quick and dirty parser for the stocks.js file since we know its format
  // We'll look for makeStock({ ... name: '...', ... })
  const regex = /makeStock\(\{\s*ticker:\s*'([^']+)',\s*name:\s*'([^']+)'/g;
  let match;
  
  const mappings = {};
  
  while ((match = regex.exec(code)) !== null) {
    const ticker = match[1];
    let name = match[2];
    
    // Some names need tweaking for wiki URLs
    let searchTitle = name;
    if (name.includes('Benny')) searchTitle = 'Benny\'s Original Motor Works';
    if (name === 'Beta Pharmaceuticals' || name === 'Betta Pharmaceuticals') searchTitle = 'Betta Pharmaceuticals';
    if (name === 'Bullhead Attorneys') searchTitle = 'Bullhead';
    if (name === 'Fruit Computers') searchTitle = 'Fruit Computers';
    if (name === 'Pißwasser') searchTitle = 'Pißwasser';
    if (name === 'Rwynns Corporation') searchTitle = 'Rwynns';
    if (name === 'Tobacco') searchTitle = 'Tobacco (company)'; // Might not exist, but let's try
    if (name === '$BAWSAQ Token') searchTitle = 'BAWSAQ';
    
    console.log(`Fetching image for ${name} (${ticker})...`);
    let img = await extractOgImage(searchTitle);
    
    if (!img) {
      // Try alternative
      const altTitle = searchTitle.split(' ')[0];
      img = await extractOgImage(altTitle);
    }
    
    if (img) {
      mappings[ticker] = img;
      console.log(`Found: ${img}`);
    } else {
      console.log(`Not found for ${name}`);
    }
  }
  
  await fs.writeFile('img_mappings.json', JSON.stringify(mappings, null, 2));
  console.log('Done!');
}

run();

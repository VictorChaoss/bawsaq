import fs from 'fs';

const file = 'src/data/stocks.js';
let content = fs.readFileSync(file, 'utf8');

const tickersToUpdate = ['AMU', 'CBE', 'GSX', 'LFI', 'LSC', 'MWS', 'MMI', 'VUN', 'SPR', 'RED', 'PSS'];

for (const ticker of tickersToUpdate) {
  content = content.replace(`ticker: '${ticker}',`, `ticker: '${ticker}',\n    contract: 'PUMP',`);
}

fs.writeFileSync(file, content);
console.log('Updated stocks.js');

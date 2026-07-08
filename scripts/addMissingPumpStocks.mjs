import fs from 'fs';

const newStocks = `
  makeStock({
    ticker: 'CBE',
    contract: 'PUMP',
    name: 'Cluckin Bell',
    exchange: 'BAWSAQ',
    sector: 'Food/Beverage',
    desc: 'Cluckin Bell is a fast food restaurant chain featured in the Grand Theft Auto series.'
  }),
  makeStock({
    ticker: 'GSX',
    contract: 'PUMP',
    name: 'Gruppe Sechs',
    exchange: 'BAWSAQ',
    sector: 'Defense',
    desc: 'Gruppe Sechs is an armored security company featured in the Grand Theft Auto series.'
  }),
  makeStock({
    ticker: 'MWS',
    contract: 'PUMP',
    name: 'Merryweather',
    exchange: 'BAWSAQ',
    sector: 'Defense',
    desc: 'Merryweather Security is a private military company and security contractor.'
  }),
  makeStock({
    ticker: 'MMI',
    contract: 'PUMP',
    name: 'Mors Mutual Insurance',
    exchange: 'BAWSAQ',
    sector: 'Finance',
    desc: 'Mors Mutual Insurance (MMI) is an insurance company.'
  }),
  makeStock({
    ticker: 'VUN',
    contract: 'PUMP',
    name: 'Vanilla Unicorn',
    exchange: 'BAWSAQ',
    sector: 'Entertainment',
    desc: 'Vanilla Unicorn is a gentlemen\\'s club located in Strawberry, Los Santos.'
  }),
  makeStock({
    ticker: 'SPR',
    contract: 'PUMP',
    name: 'Sprunk',
    exchange: 'BAWSAQ',
    sector: 'Food/Beverage',
    desc: 'Sprunk is a popular lemon-lime soda.'
  }),
  makeStock({
    ticker: 'RED',
    contract: 'PUMP',
    name: 'Redwood',
    exchange: 'BAWSAQ',
    sector: 'Consumer Goods',
    desc: 'Redwood Cigarettes is an American brand of cigarettes.'
  }),
  makeStock({
    ticker: 'PSS',
    contract: 'PUMP',
    name: 'Pißwasser',
    exchange: 'BAWSAQ',
    sector: 'Food/Beverage',
    desc: 'Pißwasser is a German export beer.'
  })
`;

let content = fs.readFileSync('src/data/stocks.js', 'utf8');
content = content.replace(/\];\s*$/, `,${newStocks}\n];\n`);
fs.writeFileSync('src/data/stocks.js', content);
console.log('Appended missing pump stocks');

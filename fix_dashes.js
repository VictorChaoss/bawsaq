const fs = require('fs');
const path = require('path');
function replaceDashes(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceDashes(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/ — /g, ', ');
      content = content.replace(/—/g, ', ');
      fs.writeFileSync(fullPath, content);
    }
  }
}
replaceDashes('./src');

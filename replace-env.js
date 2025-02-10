const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'src/environments/environment.prod.template.ts');
const prodPath = path.join(__dirname, 'src/environments/environment.prod.ts');

let content = fs.readFileSync(templatePath, 'utf8');

content = content.replace('{{API_KEY}}', process.env.API_KEY || '');

fs.writeFileSync(prodPath, content, 'utf8');

console.log('Arquivo environment.prod.ts gerado com sucesso!');
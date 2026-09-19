const http = require('http');
const fs = require('fs');
const path = require('path');

const products = require('./data/products.json');
const publicDir = path.join(__dirname, 'public');
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.svg': 'image/svg+xml' };

http.createServer((req, res) => {
  if (req.url === '/api/products') return sendJson(res, products);
  if (req.url === '/api/health') return sendJson(res, { status: 'ok', brand: 'AesticMart' });
  const requested = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const file = path.normalize(path.join(publicDir, requested));
  if (!file.startsWith(publicDir)) return notFound(res);
  fs.readFile(file, (err, data) => {
    if (err) return notFound(res);
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(process.env.PORT || 3000, () => console.log('AesticMart is ready at http://localhost:3000'));

function sendJson(res, body) { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(body)); }
function notFound(res) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('AesticMart — page not found'); }

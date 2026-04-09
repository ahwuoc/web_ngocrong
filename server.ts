import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import express from 'express';
import path from 'path';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Serve assets from parent PHP project directory
  const assetsPath = path.join(__dirname, '..', 'assets');
  server.use('/assets', express.static(assetsPath));

  // Let Next.js handle everything else
  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});

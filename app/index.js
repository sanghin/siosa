require('dotenv').config();

const { createServer } = require('http');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3030;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = await createServer((req, res) => {
    handle(req, res, parsedUrl);
  });

  await server.listen(() => {
    if (server.err) throw server.err;

    console.log(`> Ready on http://localhost:${port}`);
  });
});

require('dotenv').config({ path: '../../.env' });

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const mongoose = require('mongoose');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;
const MONGODB_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;

app.prepare().then(async () => {
  try {
    await mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
    // eslint-disable-next-line no-console
    console.info('mongo connexion succeed');
  } catch (e) {
    console.error('mongo connexion failed', e);
  }

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.info(`> Ready on http://localhost:${port}`);
  });
});

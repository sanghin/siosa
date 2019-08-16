require('dotenv').config({ path: '../.env' });

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const mongoose = require('mongoose');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { MONGODB_USER, MONGODB_PASSWORD, MONGO_DB_HOST, MONGO_DB_PORT, MONGO_INITDB_DATABASE } = process.env;
const MONGODB_URL = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_INITDB_DATABASE}`;

console.log(MONGODB_URL);

app.prepare().then(() => {
  mongoose.connect(MONGODB_URL, { useNewUrlParser: true }).then(console.log.bind('Connected to Mongodb'));
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

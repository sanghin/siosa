const next = require('next');

const app = next({ dev: process.env.NODE_ENV !== 'production', port: 3100 });

app.start();

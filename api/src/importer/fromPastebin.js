'use strict';

const fetch = require('node-fetch');
const parser = require('xml2json');
const { inflateSync } = require('zlib');

const importFromPasteBin = async pasteBinId => {
  const response = await fetch(`https://pastebin.com/raw/${pasteBinId}`).then(r => r.text());

  // replace non allowed base64 chars
  const base64 = response.replace(/-/g, '+').replace(/_/g, '/');

  const buffer = Buffer.from(base64, 'base64');

  const inflateBuffer = inflateSync(buffer);

  return parser.toJson(inflateBuffer);
};

module.exports = importFromPasteBin;

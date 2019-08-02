'use strict';

const fetch = require('node-fetch');
const parser = require('xml2json');
const { inflateSync } = require('zlib');

/**
 * Convert PasteBin content to JSON
 * Reverse pob encoding process:
 * https://github.com/Openarl/PathOfBuilding/blob/77ec6f3ffaf75d50ee58dc6ab1d8778a499b7628/Classes/ImportTab.lua#L141
 */
const importFromPasteBin = async pasteBinId => {
  const response = await fetch(`https://pastebin.com/raw/${pasteBinId}`).then(r => r.text());

  const base64 = response.replace(/-/g, '+').replace(/_/g, '/');
  const buffer = Buffer.from(base64, 'base64');
  const inflateBuffer = inflateSync(buffer);

  return parser.toJson(inflateBuffer);
};

module.exports = importFromPasteBin;

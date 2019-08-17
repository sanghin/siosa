'use strict';

const fetch = require('node-fetch');
const parser = require('xml2json');
const { inflateSync } = require('zlib');

/**
 * Convert PasteBin content to JSON
 * Reverse pob encoding process:
 * https://github.com/Openarl/PathOfBuilding/blob/77ec6f3ffaf75d50ee58dc6ab1d8778a499b7628/Classes/ImportTab.lua#L141
 */
const fromPastebin = async pasteBinId => {
  try {
    const response = await fetch(`https://pastebin.com/raw/${pasteBinId}`);
    const text = await response.text();

    if (response.status !== 200 || text === 'Error with this ID!') {
      return null;
    }

    const base64 = text.replace(/-/g, '+').replace(/_/g, '/');
    const buffer = Buffer.from(base64, 'base64');

    const inflateBuffer = inflateSync(buffer);

    return parser.toJson(inflateBuffer.toString(), { object: true });
  } catch (err) {
    console.error(err);
  }
};

module.exports = fromPastebin;

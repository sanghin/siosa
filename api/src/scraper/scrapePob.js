'use strict';

const fetch = require('node-fetch');
const parser = require('xml2json');
const { inflateSync } = require('zlib');

const PASTEBIN_RAW_URL = 'https://pastebin.com/raw/';

const fetchRaw = async pasteBinId => {
  const response = await fetch(`${PASTEBIN_RAW_URL}${pasteBinId}`);

  return response.text();
};

// Convert PasteBin content to JSON
const convertBinToJSON = async pasteBin => {
  // Before converting JSON to base64 POB replace invalid chars
  // base64 allowed chars: A-Z a-z 0-9 +/=
  // replacement is done here // https://github.com/Openarl/PathOfBuilding/blob/77ec6f3ffaf75d50ee58dc6ab1d8778a499b7628/Classes/ImportTab.lua#L141
  const base64 = pasteBin.replace(/-/g, '+').replace(/_/g, '/');

  // creates a buffer
  const buffer = Buffer.from(base64, 'base64');

  // uncompress data
  const inflateBuffer = inflateSync(buffer);

  // fianlly convert uncompress data to JSON
  return parser.toJson(inflateBuffer);
};

const importFromPasteBin = async id => {
  const rawBuild = await fetchRaw(id);
  const json = convertBinToJSON(rawBuild);

  return json;
};

// const main = async () => {
//   const build = await importFromPasteBin('1eGPScAW');

// console.log(build);
// };

module.exports = importFromPasteBin;

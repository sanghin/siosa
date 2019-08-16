import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import parser from 'xml2json';
import { inflateSync } from 'zlib';

const regex = /^https:\/\/pastebin\.com\/(\w{8,}?)/;

/**
 * Convert PasteBin content to JSON
 * Reverse pob encoding process:
 * https://github.com/Openarl/PathOfBuilding/blob/77ec6f3ffaf75d50ee58dc6ab1d8778a499b7628/Classes/ImportTab.lua#L141
 */
const fromPastebin = async pasteBinId => {
  try {
    const response = await fetch(`https://pastebin.com/raw/${pasteBinId}`);

    if (response.status !== 200) {
      return null;
    }

    const text = await response.text();
    const base64 = text.replace(/-/g, '+').replace(/_/g, '/');
    const buffer = Buffer.from(base64, 'base64');

    const inflateBuffer = inflateSync(buffer);

    return parser.toJson(inflateBuffer.toString());
  } catch (err) {
    console.error(err);
  }
};

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const match = request.body.match(regex);

  const pasteBinId = match && match[1] ? match[1] : request.body;
  const build = await fromPastebin(pasteBinId);

  if (!build) {
    return response.end();
  }

  response.end();
};

require("reflect-metadata");

const { createConnection } = require("typeorm");
const fetch = require("node-fetch");
const parser = require("xml2json");
const { inflateSync } = require("zlib");

const Build = require("../../server/entity/Build.ts");

const regex = /^https:\/\/pastebin\.com\/(\w{8,}?)/;

/**
 * Convert PasteBin content to JSON
 * Reverse pob encoding process:
 * https://github.com/PathOfBuildingCommunity/PathOfBuilding/blob/ab3c1228c793860379cc3fe2b593581272680d05/Classes/ImportTab.lua#L178
 */
const fromPastebin = async (pasteBinId) => {
  try {
    const response = await fetch(`https://pastebin.com/raw/${pasteBinId}`);
    const text = await response.text();

    if (response.status !== 200 || text === "Error with this ID!") {
      return null;
    }

    const base64 = text.replace(/-/g, "+").replace(/_/g, "/");
    const buffer = Buffer.from(base64, "base64");

    const inflateBuffer = inflateSync(buffer);

    return parser.toJson(inflateBuffer.toString(), { object: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);

    return null;
  }
};

export default async (request, response) => {
  const match = request.body.match(regex);
  const pasteBinId = match && match[1] ? match[1] : request.body;
  const rawBuild = await fromPastebin(pasteBinId);

  if (!rawBuild) {
    // eslint-disable-next-line no-console
    console.log("EMPTY RESPONSE");

    return response.end();
  }

  try {
    const connection = await createConnection();

    const build = new Build({
      created_at: new Date().toUTCString(),
      build: rawBuild,
      version: 1,
    });

    // eslint-disable-next-line no-console
    console.log(JSON.stringify(rawBuild, null, 4));

    await connection.manager.save(build);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Failed to save", e);

    return null;
  }

  return response.status(201).json({
    meta: [],
    message: "Success",
  });
};

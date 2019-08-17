const regex = /^https:\/\/pastebin\.com\/(\w{8,}?)/;
const fromPastebin = require('pastebin/fromPastebin');

export default async (request, response) => {
  const match = request.body.match(regex);

  const pasteBinId = match && match[1] ? match[1] : request.body;

  const rawBuild = await fromPastebin(pasteBinId);

  if (!rawBuild) {
    console.log('EMPTY RESPONSE');

    return response.end();
  }

  try {
    console.log(rawBuild);

    // const build = await new Photos({ PathOfBuilding: rawBuild.PathOfBuilding, importedAt: new Date().toUTCString() });
    // await build.save();
  } catch (e) {
    console.error('Failed to save', e);
  }

  response.end();
};

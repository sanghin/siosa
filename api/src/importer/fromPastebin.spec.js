const fromPastebin = require('./fromPastebin');

describe('[fromPastebin]', () => {
  it('should import JSON data from pastebin', async () => {
    const data = await fromPastebin('0pX8gCM6');

    expect(typeof data).toBe('object');
  });
});

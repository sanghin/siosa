import { createServer, IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((request: IncomingMessage, response: ServerResponse) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    handle(request, response, parse(request.url, true));
  }).listen(3000, (err) => {
    if (err) throw err;

    // eslint-disable-next-line no-console
    console.info("> Ready on http://localhost:3000");
  });
});

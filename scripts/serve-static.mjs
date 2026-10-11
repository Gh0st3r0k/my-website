import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve("out");
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".png": "image/png",
};
createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (prefix && !(pathname === prefix || pathname.startsWith(prefix + "/"))) {
      res.writeHead(404);
      res.end();
      return;
    }
    pathname = pathname.slice(prefix.length) || "/";
    let file = resolve(root, "." + pathname);
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    let info;
    try {
      info = await stat(file);
    } catch {}
    if (info?.isDirectory()) {
      if (!pathname.endsWith("/")) {
        res.writeHead(308, {
          Location:
            prefix +
            pathname +
            "/" +
            new URL(req.url, "http://localhost").search,
        });
        res.end();
        return;
      }
      file = resolve(file, "index.html");
    }
    let body;
    try {
      body = await readFile(file);
    } catch {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(await readFile(resolve(root, "404.html")));
      return;
    }
    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
    });
    res.end(body);
  } catch {
    res.writeHead(500);
    res.end();
  }
}).listen(port, "0.0.0.0", () =>
  console.log(`Static export ready on port ${port}, prefix ${prefix || "/"}`),
);

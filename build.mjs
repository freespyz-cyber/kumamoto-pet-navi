import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "server"), { recursive: true });

const entries = ["404.html", "assets"];
for (const entry of entries) {
  await cp(join(root, entry), join(dist, entry), { recursive: true });
}
const files = (await import("node:fs/promises")).readdir(root);
  for (const entry of await files) {
    if (entry.endsWith(".html") || entry.endsWith(".xml")) {
      await cp(join(root, entry), join(dist, entry));
    }
  }
  await cp(join(root, "package.json"), join(dist, "package.json"));

  await writeFile(join(dist, "server", "index.js"), `export default { async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname === "/" || url.pathname === "" ? "/index.html" : url.pathname;
    const direct = await env.ASSETS.fetch(new Request(new URL(pathname, request.url), request));
    if (direct.status !== 404) return direct;
    return env.ASSETS.fetch(new Request(new URL("/dist" + pathname, request.url), request));
  } };\n`);

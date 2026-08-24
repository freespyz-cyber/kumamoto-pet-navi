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

await writeFile(join(dist, "server", "index.js"), `export default { async fetch(request, env) { return env.ASSETS.fetch(request); } };\n`);

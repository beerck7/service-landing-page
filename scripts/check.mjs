import { readFile, access, readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
for (const dir of ["js", "scripts"]) {
  for (const file of await readdir(dir)) {
    if (!/\.m?js$/.test(file)) continue;
    const result = spawnSync(process.execPath, ["--check", `${dir}/${file}`], {
      encoding: "utf8",
    });
    if (result.status !== 0) throw new Error(result.stderr);
  }
}
const html = await readFile("index.html", "utf8");
for (const [, path] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!/^(https?:|mailto:|tel:)/.test(path)) await access(path);
}
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
if (new Set(ids).size !== ids.length) throw new Error("Powtórzone id.");
for (const [, id] of html.matchAll(/href="#([^"]+)"/g))
  if (!ids.includes(id)) throw new Error(`Nie znaleziono sekcji ${id}.`);
if ((html.match(/<h1\b/g) ?? []).length !== 1)
  throw new Error("Strona powinna mieć jeden nagłówek h1.");
console.log("Składnia JS, odnośniki i podstawowa struktura HTML są poprawne.");

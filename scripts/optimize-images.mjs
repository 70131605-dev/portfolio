/**
 * Static hosting has no image server, so responsive variants are made at
 * build time: public/images/**  ->  public/_opt/images/**-<width>.webp
 * The custom image loader (lib/image-loader.ts) picks the right width.
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import sharp from "sharp";
import { OPT_DIR, VARIANT_WIDTHS, variantPath } from "../lib/image-variants.mjs";

const root = process.cwd();
const src = join(root, "public", "images");

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(png|jpe?g|webp)$/i.test(e.name)) yield p;
  }
}

let made = 0;
for await (const file of walk(src)) {
  const url = "/" + relative(join(root, "public"), file).split("\\").join("/");
  // The hero portrait is the focal point: keep it near-lossless.
  const quality = url.includes("portrait") ? 90 : 80;
  for (const w of VARIANT_WIDTHS) {
    const out = join(root, "public", variantPath(url, w));
    try {
      if ((await stat(out)).mtimeMs > (await stat(file)).mtimeMs) continue;
    } catch {}
    await mkdir(dirname(out), { recursive: true });
    await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(out);
    made++;
  }
}
console.log(`optimize-images: ${made} variants written to public/${OPT_DIR}`);

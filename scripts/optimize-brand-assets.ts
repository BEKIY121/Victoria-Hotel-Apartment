/**
 * Optimizes src/assets/*.JPG into public/images/brand/*.webp
 * Run: npx tsx scripts/optimize-brand-assets.ts
 */
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "src", "assets");
const OUTPUT = path.join(ROOT, "public", "images", "brand");

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 85;

const BRAND_MAP: Record<string, string> = {
  "517A5309 (Copy).JPG": "exterior-entrance",
  "517A4152 (Copy).JPG": "atrium-01",
  "517A4199 (Copy).JPG": "atrium-02",
  "517A4174 (Copy).JPG": "lobby-hallway",
  "517A4482 (Copy).JPG": "wellness-sauna",
  "517A4484 (Copy).JPG": "wellness-detail",
  "517A5201 (Copy).JPG": "room-kitchenette",
  "517A4820 (Copy).JPG": "room-dining",
  "517A4995 (Copy).JPG": "room-living",
  "517A5136 (Copy).JPG": "room-breakfast",
  "517A5225 (Copy).JPG": "room-bedroom",
  "517A5241 (Copy).JPG": "room-suite",
  "517A4501 (Copy).JPG": "hallway",
  "517A4505 (Copy).JPG": "room-detail-01",
  "517A4533 (Copy).JPG": "room-detail-02",
  "517A5021 (Copy).JPG": "room-detail-03",
};

async function main() {
  await fs.mkdir(OUTPUT, { recursive: true });
  const entries = await fs.readdir(SOURCE);
  let count = 0;

  for (const file of entries) {
    if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
    const slug = BRAND_MAP[file] ?? file.replace(/\.[^.]+$/, "").toLowerCase();
    const src = path.join(SOURCE, file);
    const dest = path.join(OUTPUT, `${slug}.webp`);
    await sharp(src)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(dest);
    console.log(`  ✓ ${slug}.webp ← ${file}`);
    count++;
  }

  console.log(`\nDone. ${count} images → public/images/brand/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

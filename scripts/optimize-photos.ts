/**
 * Copies and optimizes photos from "new photos/" into public/images/
 * Run: npm run photos
 */
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "new photos");
const OUTPUT = path.join(ROOT, "public", "images");

const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;

const ROOM_MAP: Record<string, string> = {
  Standard: "standard-room",
  Deluxe: "deluxe-room",
  "Deluxe Suite": "deluxe-suite",
  "Luxury Suite": "luxury-suite",
  Family: "family-room",
};

const GALLERY_MAP: Record<string, string> = {
  lobby: "lobby",
  Recreation: "recreation",
  Resturant: "restaurant",
  "Victoria Guesthouse": "property",
};

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function optimizeImage(src: string, dest: string) {
  await sharp(src)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(dest);
}

async function processFolder(
  srcFolder: string,
  destFolder: string,
  limit?: number
) {
  await ensureDir(destFolder);
  const entries = await fs.readdir(srcFolder);
  const files = entries
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort()
    .slice(0, limit);

  let index = 0;
  for (const file of files) {
    index++;
    const src = path.join(srcFolder, file);
    const dest = path.join(destFolder, `${String(index).padStart(2, "0")}.webp`);
    const stat = await fs.stat(src);
    console.log(`  ${path.basename(destFolder)}/${path.basename(dest)} ← ${file} (${Math.round(stat.size / 1024)} KB)`);
    await optimizeImage(src, dest);
  }
  return index;
}

async function main() {
  console.log("Optimizing photos...\n");

  console.log("Rooms:");
  for (const [folder, slug] of Object.entries(ROOM_MAP)) {
    const src = path.join(SOURCE, folder);
    const dest = path.join(OUTPUT, "rooms", slug);
    try {
      const count = await processFolder(src, dest);
      console.log(`  ✓ ${slug}: ${count} images\n`);
    } catch (err) {
      console.warn(`  ✗ ${slug}: ${(err as Error).message}\n`);
    }
  }

  console.log("Gallery:");
  for (const [folder, slug] of Object.entries(GALLERY_MAP)) {
    const src = path.join(SOURCE, folder);
    const dest = path.join(OUTPUT, "gallery", slug);
    try {
      const count = await processFolder(src, dest);
      console.log(`  ✓ ${slug}: ${count} images\n`);
    } catch (err) {
      console.warn(`  ✗ ${slug}: ${(err as Error).message}\n`);
    }
  }

  console.log("Done. Images saved to public/images/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { readFile } from "node:fs/promises";
import { join } from "node:path";

const regularPath = join(process.cwd(), "public/fonts/jakarta-400.ttf");
const semiboldPath = join(process.cwd(), "public/fonts/jakarta-600.ttf");

let cached: Promise<{ regular: Buffer; semibold: Buffer }> | undefined;

/**
 * Satori cannot use the Astro Fonts API output directly, so the OG endpoint reads
 * vendored static Plus Jakarta Sans instances instead of fetching at build time.
 */
export function loadJakarta(): Promise<{ regular: Buffer; semibold: Buffer }> {
  cached ??= Promise.all([readFile(regularPath), readFile(semiboldPath)]).then(
    ([regular, semibold]) => ({ regular, semibold }),
  );
  return cached;
}

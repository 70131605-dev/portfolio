/** Shared by the build script and the runtime image loader. */
export const OPT_DIR = "_opt";
export const VARIANT_WIDTHS = [384, 640, 960, 1280, 1920];

/** "/images/a/b.png", 640  ->  "/_opt/images/a/b-640.webp" */
export const variantPath = (src, width) => `/${OPT_DIR}${src.replace(/\.(png|jpe?g|webp)$/i, "")}-${width}.webp`;

/** Smallest variant at least as wide as requested. */
export const pickWidth = (width) => VARIANT_WIDTHS.find((w) => w >= width) ?? VARIANT_WIDTHS[VARIANT_WIDTHS.length - 1];

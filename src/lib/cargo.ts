/** Build a resized image URL from the Cargo freight CDN */
export function cargoImg(hash: string, filename: string, width = 1200) {
  return `https://freight.cargo.site/w/${width}/i/${hash}/${encodeURIComponent(filename)}`;
}

/** Build an original-size media URL (use for videos) */
export function cargoOriginal(hash: string, filename: string) {
  return `https://freight.cargo.site/t/original/i/${hash}/${encodeURIComponent(filename)}`;
}

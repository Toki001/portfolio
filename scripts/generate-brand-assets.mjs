import sharp from 'sharp';
import { writeFile, readFile } from 'node:fs/promises';
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#183a32"/><path d="M28 18v22c0 8-14 10-16 0m26-22v28h7c17 0 17-28 0-28z" fill="none" stroke="#fcf9f0" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
await writeFile('public/favicon.svg', favicon);
for (const [file, size] of [['favicon-32x32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(Buffer.from(favicon)).resize(size, size).png().toFile(`public/${file}`);
}
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(size => sharp(Buffer.from(favicon)).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((png, i) => {
  const entry = 6 + i * 16;
  header[entry] = sizes[i]; header[entry + 1] = sizes[i];
  header.writeUInt16LE(1, entry + 4); header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8); header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...images]));
await writeFile('public/site.webmanifest', JSON.stringify({
  name: 'Jameskier Doliguez — Portfolio', short_name: 'JD Portfolio', start_url: '/', scope: '/',
  display: 'browser', background_color: '#fcf9f0', theme_color: '#183a32',
  icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 2) + '\n');
const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#fcf9f0"/><rect x="38" y="38" width="1124" height="554" rx="32" fill="#fff" stroke="#c1c8c4"/><rect x="82" y="86" width="74" height="74" rx="18" fill="#183a32"/><text x="95" y="137" font-family="sans-serif" font-weight="700" font-size="38" fill="#fcf9f0">JD</text><text x="182" y="131" font-family="sans-serif" font-size="23" fill="#9f4123">SOFTWARE ENGINEER · PHILIPPINES</text><text x="82" y="276" font-family="sans-serif" font-weight="700" font-size="65" fill="#00241d">Jameskier</text><text x="82" y="354" font-family="sans-serif" font-weight="700" font-size="65" fill="#00241d">Doliguez</text><text x="84" y="425" font-family="sans-serif" font-size="30" fill="#414846">Mobile, Web &amp; AI Developer</text><path d="M84 475h570" stroke="#c1c8c4"/><text x="84" y="524" font-family="sans-serif" font-size="23" fill="#9f4123">Flutter · React · Machine Learning</text></svg>`;
const portrait = await sharp(await readFile('src/assets/profile.webp')).resize(300, 300).png().toBuffer();
await sharp(Buffer.from(card)).composite([{ input: portrait, left: 798, top: 218 }]).jpeg({ quality: 85, mozjpeg: true }).toFile('public/og-image.jpg');
console.log('Generated OG image, SVG/ICO/PNG favicons, touch icon and web manifest.');

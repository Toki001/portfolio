import sharp from 'sharp';
import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { siteConfig } from '../dist-server/entry-server.js';

const { identity, projects, seo } = siteConfig;
const xml = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#890620"/><path d="M28 18v22c0 8-14 10-16 0m26-22v28h7c17 0 17-28 0-28z" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
await writeFile('public/favicon.svg', favicon);
for (const [file,size] of [['favicon-32x32.png',32],['apple-touch-icon.png',180],['icon-192.png',192],['icon-512.png',512]]) {
  await sharp(Buffer.from(favicon)).resize(size,size).png().toFile(`public/${file}`);
}
const sizes = [16,32,48];
const icons = await Promise.all(sizes.map(size => sharp(Buffer.from(favicon)).resize(size,size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1,2); header.writeUInt16LE(sizes.length,4);
let offset = header.length;
icons.forEach((png,i) => {
  const entry = 6 + i * 16;
  header[entry] = sizes[i]; header[entry+1] = sizes[i];
  header.writeUInt16LE(1,entry+4); header.writeUInt16LE(32,entry+6);
  header.writeUInt32LE(png.length,entry+8); header.writeUInt32LE(offset,entry+12);
  offset += png.length;
});
await writeFile('public/favicon.ico',Buffer.concat([header,...icons]));
await writeFile('public/site.webmanifest',JSON.stringify({
  name: `${identity.name} — Portfolio`, short_name: 'JD Portfolio', start_url:'/',scope:'/',display:'browser',
  background_color:'#FFFFFF',theme_color:'#FFFFFF',
  icons:[{src:'/icon-192.png',sizes:'192x192',type:'image/png'},{src:'/icon-512.png',sizes:'512x512',type:'image/png'}],
},null,2)+'\n');

function lines(text,max) {
  const result=[];
  for(const word of text.split(' ')) {
    if(!result.length || result[result.length-1].length+word.length+1>max) result.push(word);
    else result[result.length-1]+=` ${word}`;
  }
  return result;
}
await mkdir('public/og',{recursive:true});
for (const project of [null,...projects]) {
  const titleLines=project ? [project.title] : identity.name.split(' ');
  const description=project ? project.description : identity.heroStatement;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#FFFFFF"/><rect x="784" width="416" height="630" fill="#011936"/>
    <path d="M64 150H730M64 530H730" stroke="#767B91"/>
    <text x="64" y="91" font-family="Helvetica,Arial,sans-serif" font-size="24" font-weight="700" fill="#890620">jd.</text>
    <text x="136" y="91" font-family="Helvetica,Arial,sans-serif" font-size="20" fill="#03191E">${xml(project ? identity.name : identity.title)}</text>
    ${titleLines.map((line,i)=>`<text x="60" y="${project?284:264+i*86}" font-family="Helvetica,Arial,sans-serif" font-weight="600" font-size="${project?78:74}" letter-spacing="-4" fill="#03191E">${xml(line)}${i===titleLines.length-1?'<tspan fill="#890620">.</tspan>':''}</text>`).join('')}
    ${lines(description,47).slice(0,4).map((line,i)=>`<text x="64" y="${project?366+i*34:417+i*32}" font-family="Helvetica,Arial,sans-serif" font-size="24" fill="#03191E">${xml(line)}</text>`).join('')}
    <text x="64" y="574" font-family="Helvetica,Arial,sans-serif" font-size="18" fill="#890620">${xml(project ? `${project.kind} / ${project.statusLabel}` : new URL(seo.siteUrl).hostname)}</text>
    ${project&&!project.media.length?`<text x="836" y="302" font-family="Helvetica,Arial,sans-serif" font-size="34" fill="#FFFFFF">Project note</text><path d="M840 338h270" stroke="#767B91"/>`:''}
  </svg>`;
  let card=sharp(Buffer.from(svg));
  if(!project) {
    const portrait=await sharp(await readFile('src/assets/profile.webp')).resize(338,410,{fit:'cover'}).grayscale().png().toBuffer();
    card=card.composite([{input:portrait,left:823,top:110}]);
  } else if(project.media.length) {
    const image=await sharp(await readFile(`public${project.media[0].src}`)).resize(350,460,{fit:'contain',background:'#011936'}).png().toBuffer();
    card=card.composite([{input:image,left:817,top:85}]);
  }
  await card.jpeg({quality:87,mozjpeg:true}).toFile(project?`public/og/${project.slug}.jpg`:'public/og-image.jpg');
}
console.log('Generated approved-palette icons, manifest and five real 1200×630 JPEG social cards.');

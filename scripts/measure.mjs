// Run against an isolated local production server; never an unverified live deployment.
import { spawn } from 'node:child_process';
import { once } from 'node:events';
const port=4175;
const server=spawn(process.execPath,['scripts/preview.mjs'],{env:{...process.env,PORT:String(port)},stdio:['ignore','pipe','inherit']});
try {
  await once(server.stdout,'data');
  for(const [name,path,desktop] of [['mobile','/',false],['desktop','/',true],['peso-mobile','/projects/peso-flow',false],['index-mobile','/projects',false]]) {
    const args=['node_modules/lighthouse/cli/index.js',`http://127.0.0.1:${port}${path}`,'--chrome-flags=--headless --no-sandbox','--output=json','--output=html',`--output-path=docs/verification/lighthouse-${name}`,'--only-categories=performance,accessibility,best-practices,seo','--quiet',...(desktop?['--preset=desktop']:[])];
    const child=spawn(process.execPath,args,{stdio:'inherit'});
    const [code]=await once(child,'exit');
    if(code!==0) throw new Error(`Lighthouse ${name} failed: ${code}`);
    console.log(`Measured ${name}`);
  }
} finally { server.kill(); }

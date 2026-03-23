const fs = require('fs');
const path = require('path');

const root = process.cwd();
const source = path.join(root, 'apps', 'site', 'dist');
const target = path.join(root, 'dist');

if (!fs.existsSync(source)) {
  console.error('[prepare-vercel-dist] Source dist not found:', source);
  process.exit(1);
}

fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });
fs.cpSync(source, target, { recursive: true });

console.log('[prepare-vercel-dist] Copied', source, '->', target);

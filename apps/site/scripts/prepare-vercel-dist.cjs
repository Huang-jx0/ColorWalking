const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const dist = path.join(cwd, 'dist');

if (!fs.existsSync(dist)) {
  console.error('[prepare-vercel-dist] dist not found in', cwd);
  process.exit(1);
}

console.log('[prepare-vercel-dist] dist exists:', dist);
process.exit(0);

#!/usr/bin/env node

const fs = require('fs');
const cp = require('child_process');

if ( process.argv.length !== 4 ){
  console.error("Usage: logo-convert SOURCE DEST");
  process.exit(1);
}

const [
  interpreter,  // first argument is the node application
  script,       // second argument is the path to our script
  originalLogo, // the logo to be converted
  destPath      // the folder where the converted logos should
                // be created
] = process.argv;

if ( ! fs.existsSync(originalLogo) ){
  console.error(`Your source image "${originalLogo}" does not exist.`);
  process.exit(1);
}

if ( ! fs.existsSync(destPath) ){
  console.error(`Your destination "${destPath}" does not exist.`);
  process.exit(1);
}

cp.execSync(`
convert -background transparent -resize 512x512 ${originalLogo} ${destPath}/logo512.png;
convert -background transparent -resize 192x192 ${originalLogo} ${destPath}/logo192.png;
convert -background transparent -resize 64x64   ${originalLogo} ${destPath}/favicon.ico;
`);
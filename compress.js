// npm install fflate
// npm install fs

// then run node compress <filename>

const fflate = require('fflate');
const fs = require('fs');

// Check if a filename is provided as a command-line argument
if (process.argv.length < 3) {
    console.error('Usage: node compress <filename>');
    process.exit(1);
}

const inputFile = process.argv[2];

// Compress the file content
const compressedData = fflate.gzipSync(fs.readFileSync(inputFile));
const base64EncodedString = Buffer.from(compressedData).toString('base64');
fs.writeFileSync(inputFile + '.gz', base64EncodedString);

console.log('File compressed successfully.');

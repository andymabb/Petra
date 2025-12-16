const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'dist', 'img', 'unused');
const gifFiles = fs.readdirSync(inputDir).filter(file => file.endsWith('.gif'));

console.log(`Found ${gifFiles.length} GIF files to convert...`);

gifFiles.forEach(async (file) => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(inputDir, file.replace('.gif', '.avif'));
    
    try {
        await sharp(inputPath)
            .avif({ quality: 80, effort: 6 })
            .toFile(outputPath);
        
        const inputSize = fs.statSync(inputPath).size;
        const outputSize = fs.statSync(outputPath).size;
        const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);
        
        console.log(`✓ ${file} → ${path.basename(outputPath)} (${savings}% smaller)`);
    } catch (error) {
        console.error(`✗ Error converting ${file}:`, error.message);
    }
});

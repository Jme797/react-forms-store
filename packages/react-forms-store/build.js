const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Remove the dist directory
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, {recursive: true, force: true});
    console.log('Removed existing dist directory.');
}

esbuild
    .build({
        entryPoints: ['./src/index.ts'],
        bundle: true,
        minify: true,
        sourcemap: true,
        target: ['es2020'],
        outdir: 'dist',
        platform: 'node',
        external: ['react', 'react-dom'],
        format: 'cjs',
    })
    .then(() => {
        console.log('Build completed successfully.');
    })
    .catch(error => {
        console.error('Build failed:', error);
        process.exit(1);
    });

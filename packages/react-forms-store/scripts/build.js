const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Remove the dist directory
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
    console.log('Removed existing dist directory.');
}

// Run TypeScript compiler to generate type declarations
try {
    console.log('Generating type declarations...');
    execSync('tsc --emitDeclarationOnly --outDir dist', { stdio: 'inherit' });
    console.log('Type declarations generated successfully.');
} catch (error) {
    console.error('Failed to generate type declarations:', error);
    process.exit(1);
}

// Build with esbuild
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

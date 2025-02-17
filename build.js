const esbuild = require('esbuild');

esbuild
    .build({
        entryPoints: ['src/index.ts'],
        bundle: true,
        outfile: 'dist/index.js',
        platform: 'node',
        format: 'cjs',
        sourcemap: false,
        minify: false,
    })
    .catch(() => process.exit(1));

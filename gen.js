const fs = require('fs');
const path = require('path');

const packages = [
    'packages/react-forms-store',
    'packages/react-forms-store-ux',
];

const typedocConfig = {
    entryPoints: ['src/index.tsx'],
    out: 'docs',
    plugin: ['typedoc-plugin-markdown'],
    exclude: ['**/*.test.ts', '**/*.stories.tsx'],
    excludeExternals: true,
    excludePrivate: true,
    excludeProtected: true,
    includeVersion: true,
    readme: 'none',
    tsconfig: 'tsconfig.typedoc.json',
};

const tsconfigTypedoc = {
    compilerOptions: {
        jsx: 'react-jsx',
        target: 'ES5',
        module: 'ESNext',
        moduleResolution: 'Node',
        esModuleInterop: true,
        skipLibCheck: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
    },
    include: ['src'],
};

packages.forEach(packagePath => {
    const packageJsonPath = path.join(packagePath, 'package.json');
    const typedocConfigPath = path.join(packagePath, 'typedoc.json');
    const tsconfigTypedocPath = path.join(packagePath, 'tsconfig.typedoc.json');

    // Write typedoc.json
    fs.writeFileSync(typedocConfigPath, JSON.stringify(typedocConfig, null, 2));
    console.log(`Generated ${typedocConfigPath}`);

    // Write tsconfig.typedoc.json
    fs.writeFileSync(
        tsconfigTypedocPath,
        JSON.stringify(tsconfigTypedoc, null, 2)
    );
    console.log(`Generated ${tsconfigTypedocPath}`);

    // Update package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts.docs = 'typedoc';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`Updated ${packageJsonPath}`);
});

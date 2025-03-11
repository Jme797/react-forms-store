const fs = require('fs');
const path = require('path');

const fields = [
    'Field',
    'TextField',
    'NumberField',
    'ChoiceField',
    'MultiChoiceField',
    'DateField',
    'FileField',
    'MultiFileField',
    'ColorField'
];

const srcDir = path.join(__dirname, 'packages/react-forms-store/src/fields');

fields.forEach(field => {
    const fieldDir = path.join(srcDir, field);
    const fieldFile = path.join(srcDir, `${field}.tsx`);
    const testFile = path.join(fieldDir, `${field}.test.ts`);
    const indexFile = path.join(fieldDir, 'index.ts');

    // Create directory for the field
    if (!fs.existsSync(fieldDir)) {
        fs.mkdirSync(fieldDir);
    }

    // Move the field file into the directory
    if (fs.existsSync(fieldFile)) {
        fs.renameSync(fieldFile, path.join(fieldDir, `${field}.ts`));
    }

    // Create a test file if it doesn't exist
    if (!fs.existsSync(testFile)) {
        fs.writeFileSync(testFile, `import { ${field} } from './${field}';\n\ntest('${field} should work correctly', () => {\n    const field = new ${field}();\n    // Your test implementation\n});\n`);
    }

    // Create an index file if it doesn't exist
    if (!fs.existsSync(indexFile)) {
        fs.writeFileSync(indexFile, `export * from './${field}';\n`);
    }
});

// Update the main index.ts file
const mainIndexFile = path.join(srcDir, 'index.ts');
const mainIndexContent = fields.map(field => `export * from './${field}';`).join('\n');
fs.writeFileSync(mainIndexFile, mainIndexContent);

console.log('Field files organized successfully.');

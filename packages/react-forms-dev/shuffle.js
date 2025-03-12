import fs from 'fs';
import path from 'path';

// Directory containing the files to update
const targetDir = path.join(process.cwd(), 'src/stories');

// Path to the StorybookNamespaces file
const enumFilePath = path.join(
    process.cwd(),
    '.storybook/storybookNamespaces.ts'
);

// Read the enum file and extract the enum values
const enumContent = fs.readFileSync(enumFilePath, 'utf-8');
const enumMatch = enumContent.match(
    /export enum StorybookNamespaces \{([^}]+)\}/
);

if (!enumMatch) {
    throw new Error(
        'Could not find StorybookNamespaces enum in the specified file.'
    );
}

let enumValues = enumMatch[1]
    .trim()
    .split(',')
    .map(line => line.split(':')[0].trim());

const enumObject = enumValues.reduce((acc, key) => {
    const valueMatch = enumContent.match(
        new RegExp(`${key}:\\s*['"]([^'"]+)['"]`)
    );
    if (valueMatch) {
        acc[key] = valueMatch[1];
    }
    return acc;
}, {});

// Function to convert a string to snake case and uppercase
const toSnakeCaseUpper = str => str.replace(/\s+/g, '_').toUpperCase();

// Function to update files with enum values
const updateFilesWithEnum = dir => {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            updateFilesWithEnum(filePath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            let content = fs.readFileSync(filePath, 'utf-8');
            const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);

            if (titleMatch) {
                const title = titleMatch[1];
                const [namespace, ...rest] = title.split('/');
                const restTitle = rest.join('/');

                let enumKey = Object.keys(enumObject).find(
                    key => enumObject[key] === namespace
                );
                if (!enumKey) {
                    enumKey = toSnakeCaseUpper(namespace);
                    enumObject[enumKey] = namespace;
                    enumValues.push(enumKey);
                }

                const newTitle = `\${StorybookNamespaces.${enumKey}}/${restTitle}`;
                content = content.replace(
                    titleMatch[0],
                    `title: \`${newTitle}\``
                );
            }

            fs.writeFileSync(filePath, content);
            console.log(`Updated ${filePath}`);
        }
    });
};

// Add import statement to files
const addImportStatement = dir => {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            addImportStatement(filePath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            let content = fs.readFileSync(filePath, 'utf-8');

            if (
                !content.includes(
                    "import { StorybookNamespaces } from '../../../.storybook/storybookNamespaces';"
                )
            ) {
                content = `import { StorybookNamespaces } from '../../../.storybook/storybookNamespaces';\n${content}`;
                fs.writeFileSync(filePath, content);
                console.log(`Added import to ${filePath}`);
            }
        }
    });
};

// Update the enum file with new values
const updateEnumFile = () => {
    const newEnumContent = `export enum StorybookNamespaces {\n${enumValues
        .map(key => `    ${key}: '${enumObject[key]}'`)
        .join(',\n')}\n}\n`;

    fs.writeFileSync(enumFilePath, newEnumContent);
    console.log(`Updated ${enumFilePath}`);
};

// Run the script
addImportStatement(targetDir);
updateFilesWithEnum(targetDir);
updateEnumFile();

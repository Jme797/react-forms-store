import fs from 'fs';
import path from 'path';

const localesDir = path.resolve('src/locales/en');
const outputDir = path.resolve('src/i18n');
const outputFile = path.join(outputDir, 'translation.ts');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, {recursive: true});
}

const getTranslationKeys = (obj, prefix = '') => {
    return Object.keys(obj).reduce((res, key) => {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
            res.push(...getTranslationKeys(value, newKey));
        } else {
            res.push(newKey);
        }
        return res;
    }, []);
};

const generateNamespaceType = (namespace, keys) => {
    const lines = keys.map(key => `    '${key}': string;`);
    return `  ${namespace}: {\n${lines.join('\n')}\n  };`;
};

const namespaces = fs
    .readdirSync(localesDir)
    .filter(file => file.endsWith('.json'))
    .map(file => path.basename(file, '.json'));

let typeDefinitions = `// This file is auto-generated. Do not edit manually.
// Run 'yarn i18n' to update this file.

export type TranslationStrings = {\n`;

namespaces.forEach(namespace => {
    const filePath = path.join(localesDir, `${namespace}.json`);
    const translations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const translationKeys = getTranslationKeys(translations);
    typeDefinitions += generateNamespaceType(namespace, translationKeys) + '\n';
});

typeDefinitions += '}\n';

fs.writeFileSync(outputFile, typeDefinitions, 'utf-8');
console.log(`Type definitions generated at ${outputFile}`);

// Clean up the locales directory
namespaces.forEach(namespace => {
    const filePath = path.join(localesDir, `${namespace}.json`);
    fs.unlinkSync(filePath);
});
console.log(`Locales directory cleaned up.`);

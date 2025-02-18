import mergePluginConfigs from 'merge-prettier-plugins';
import sortImports from 'prettier-plugin-import-sorting';
import unusedImports from 'prettier-remove-unused-imports';

export default {
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: false,
    arrowParens: 'avoid',
    plugins: [mergePluginConfigs(sortImports, unusedImports)],
    importOrder: [
        '<UNKNOWN>',
        '^react$',
        '^react-forms-store$',
        '^react-forms-store-ux$',
        '^@mui',
        '^../',
        '^./',
    ],
};

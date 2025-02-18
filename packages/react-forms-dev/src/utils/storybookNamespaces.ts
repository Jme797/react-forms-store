export const StorybookNamespaces = {
    CHOICE_FIELDS: 'Choice Fields',
    COLOR_FIELDS: 'Color fields',
    DATE_FIELDS: 'Date Fields',
    EXAMPLES: 'Examples',
    FILE_FIELDS: 'File fields',
    NUMBER_FIELDS: 'Number Fields',
    TEXT_FIELDS: 'Text Fields',
} as const;

export type StorybookNamespacesType =
    (typeof StorybookNamespaces)[keyof typeof StorybookNamespaces];

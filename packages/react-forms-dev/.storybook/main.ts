import type {StorybookConfig} from '@storybook/react-vite';
import {dirname, join} from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
    // eslint-disable-next-line no-undef
    return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        getAbsolutePath('@storybook/addon-onboarding'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@chromatic-com/storybook'),
        getAbsolutePath('@storybook/addon-interactions'),
        getAbsolutePath('@storybook/addon-docs'), // Addon for viewing documentation and code
        getAbsolutePath('@storybook/addon-controls'), // Addon for controlling props dynamically
    ],
    framework: {
        name: getAbsolutePath('@storybook/react-vite'),
        options: {},
    },
};

export default config;

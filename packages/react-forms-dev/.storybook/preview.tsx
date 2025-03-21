import type {Preview} from '@storybook/react';

import React from 'react';

import {initI18n} from 'react-forms-store';

import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import './global.css';

await initI18n({
    en: {
        translation: {
            description: 'English',
        },
    },
    fr: {
        translation: {
            description: 'French',
        },
    },
});

const withThemeProvider = (Story, context) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Story {...context} />
        </ThemeProvider>
    );
};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        options: {
            storySort: {
                order: [
                    'Examples',
                    'Text Fields',
                    'Number Fields',
                    'Choice Fields',
                    'File fields',
                    'Date Fields',
                    'Color fields',
                ],
            },
        },
    },
    decorators: [withThemeProvider],
};

export default preview;

import type {Preview} from '@storybook/react';

import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../.storybook/global.css';

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
    },
    decorators: [withThemeProvider],
};

export default preview;

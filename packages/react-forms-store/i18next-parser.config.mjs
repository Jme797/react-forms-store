export default {
    locales: ['en'], // Add other locales as needed
    output: 'src/locales/$LOCALE/$NAMESPACE.json',
    input: ['src/**/*.{js,jsx,ts,tsx}'],
    sort: true,
};

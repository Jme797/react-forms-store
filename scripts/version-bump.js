const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const newVersion = process.argv[2];

if (!newVersion) {
    console.error('Please provide a version number.');
    process.exit(1);
}

// Find all package.json files in the packages directory
const packageJsonPaths = execSync('grep -rl "version" packages/*/package.json')
    .toString()
    .trim()
    .split('\n');

packageJsonPaths.forEach(packageJsonPath => {
    if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(
            fs.readFileSync(packageJsonPath, 'utf8')
        );
        packageJson.version = newVersion;
        fs.writeFileSync(
            packageJsonPath,
            JSON.stringify(packageJson, null, 2) + '\n'
        );
        console.log(`Updated version to ${newVersion} in ${packageJsonPath}`);
    } else {
        console.error(`package.json not found at ${packageJsonPath}`);
    }
});

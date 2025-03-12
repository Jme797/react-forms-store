import {execSync} from 'child_process';
import inquirer from 'inquirer';
import semver from 'semver';

// Fetch all tags from the remote repository
execSync('git fetch --tags', {stdio: 'inherit'});

// Get the latest tag
const tags = execSync('git tag --sort=-v:refname')
    .toString()
    .trim()
    .split('\n');
const latestTag = tags[0] || '0.0.0';

// Suggest the next version (patch bump)
const suggestedVersion = semver.inc(latestTag, 'patch');

// Prompt for the version number
inquirer
    .prompt([
        {
            type: 'input',
            name: 'version',
            message: 'Enter the new version number:',
            default: suggestedVersion,
            validate: input => {
                if (semver.valid(input)) {
                    return true;
                }
                return 'Please enter a valid version number (e.g., 1.0.0)';
            },
        },
    ])
    .then(answers => {
        const newVersion = answers.version;

        // Run tests (commented out for now)
        try {
            execSync('make test', { stdio: 'inherit' });
            console.log('Tests passed successfully.');
        } catch (error) {
            console.error('Tests failed:', error);
            process.exit(1);
        }

        // Create a new git tag
        execSync(`git tag ${newVersion}`, {stdio: 'inherit'});

        // Push the tag to the remote repository
        execSync(`git push origin ${newVersion}`, {stdio: 'inherit'});

        console.log(`Successfully created and pushed tag ${newVersion}`);
    })
    .catch(error => {
        console.error('Error creating release:', error);
        process.exit(1);
    });

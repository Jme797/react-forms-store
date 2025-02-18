import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

// Directory to save the generated stories
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const examplesDir = path.join(__dirname, 'src/stories/examples');

// Ensure the examples directory exists
fs.mkdirSync(examplesDir, {recursive: true});

// List of available fields
const fields = [
    'TextField',
    'NumberField',
    'ChoiceField',
    'MultiChoiceField',
    'DateField',
    'FileField',
    'MultiFileField',
    'ColorField',
];

// Function to get a random subset of fields
const getRandomFields = () => {
    const shuffled = fields.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5); // Select 5 random fields
};

// Template for the example form stories
const generateStoryTemplate = (index, randomFields) => `
import React from 'react';
import { Form } from 'react-forms-store';
import { ${randomFields.join(', ')} } from 'react-forms-store';
import { Box, Button, Container, Typography } from '@mui/material';

const formFields = {
  ${randomFields
      .map(
          field => `
  ${field.toLowerCase()}: new ${field}({
    label: '${field.replace(/([A-Z])/g, ' $1').trim()}',
    initValue: ${field === 'NumberField' ? 50 : 'undefined'},
    required: true,
    validation: [
      {
        rule: (value) => value !== undefined,
        error: '${field.replace(/([A-Z])/g, ' $1').trim()} is required.',
      },
    ],
  }),`
      )
      .join('')}
};

const form = new Form(formFields);

const ExampleForm${index}: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    form.submit(async (data) => {
      console.log('Form submitted with data:', data);
      alert('Form submitted!');
    });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Example Form ${index}</Typography>
          ${randomFields.map(field => `<${field} field={formFields.${field.toLowerCase()}} />`).join('\n          ')}
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default {
  title: 'Examples/ExampleForm${index}',
  component: ExampleForm${index},
};

export const Default = ExampleForm${index};
`;

// Generate 5 example form stories
for (let i = 1; i <= 5; i++) {
    const randomFields = getRandomFields();
    const storyContent = generateStoryTemplate(i, randomFields);
    const storyPath = path.join(examplesDir, `ExampleForm${i}.stories.tsx`);
    fs.writeFileSync(storyPath, storyContent);
    console.log(`Generated ${storyPath}`);
}

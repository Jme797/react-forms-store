import {Meta, StoryFn} from '@storybook/react';
import FilePicker from 'react-forms-store-ux/src/fields/FilePicker';

import React from 'react';

import {Form} from 'react-forms-store';
import {MultipleFileField, SingleFileField} from 'react-forms-store';

import {Box, Button, Container} from '@mui/material';

export default {
    title: 'File fields/FilePicker',
    component: FilePicker,
} as Meta;

const Template: StoryFn = args => {
    const singleFileField = new SingleFileField({
        label: 'Upload a File',
        initValue: undefined,
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'A file must be selected.',
            },
        ],
    });

    const multipleFileField = new MultipleFileField({
        label: 'Upload Multiple Files',
        initValue: [],
        required: true,
        validation: [
            {
                rule: value => Array.isArray(value) && value.length > 0,
                error: 'At least one file must be selected.',
            },
        ],
    });

    const form = new Form({
        singleFile: singleFileField,
        multipleFiles: multipleFileField,
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        form.submit(async data => {
            console.log('Form submitted with data:', data);
            alert('Form submitted!');
        });
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Box sx={{mb: 2}}>
                    <FilePicker field={singleFileField} {...args} />
                </Box>
                <Box sx={{mb: 2}}>
                    <FilePicker field={multipleFileField} {...args} />
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export const Default = Template.bind({});
Default.args = {};

import React from 'react';

import {Form} from 'react-forms-store';
import {
    ChoiceField,
    DateField,
    FileField,
    MultiFileField,
    TextField,
} from 'react-forms-store';

import {Box, Button, Container, Typography} from '@mui/material';

const formFields = {
    textfield: new TextField({
        label: 'Text Field',
        initValue: undefined,
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'Text Field is required.',
            },
        ],
    }),
    datefield: new DateField({
        label: 'Date Field',
        initValue: undefined,
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'Date Field is required.',
            },
        ],
    }),
    filefield: new FileField({
        label: 'File Field',
        initValue: undefined,
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'File Field is required.',
            },
        ],
    }),
    choicefield: new ChoiceField({
        label: 'Choice Field',
        initValue: undefined,
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'Choice Field is required.',
            },
        ],
    }),
    multifilefield: new MultiFileField({
        label: 'Multi File Field',
        initValue: undefined,
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'Multi File Field is required.',
            },
        ],
    }),
};

const form = new Form(formFields);

const ExampleForm2: React.FC = () => {
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
                    <Typography variant="h6">Example Form 2</Typography>
                    <TextField field={formFields.textfield} />
                    <DateField field={formFields.datefield} />
                    <FileField field={formFields.filefield} />
                    <ChoiceField field={formFields.choicefield} />
                    <MultiFileField field={formFields.multifilefield} />
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default {
    title: 'Examples/ExampleForm2',
    component: ExampleForm2,
};

export const Default = ExampleForm2;

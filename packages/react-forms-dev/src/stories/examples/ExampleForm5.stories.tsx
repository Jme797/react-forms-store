import React from 'react';

import {Form} from 'react-forms-store';
import {
    ColorField,
    FileField,
    MultiChoiceField,
    MultiFileField,
    TextField,
} from 'react-forms-store';

import {Box, Button, Container, Typography} from '@mui/material';

const formFields = {
    colorfield: new ColorField({
        label: 'Color Field',
        initValue: undefined,
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'Color Field is required.',
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
    multichoicefield: new MultiChoiceField({
        label: 'Multi Choice Field',
        initValue: undefined,
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'Multi Choice Field is required.',
            },
        ],
    }),
};

const form = new Form(formFields);

const ExampleForm5: React.FC = () => {
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
                    <Typography variant="h6">Example Form 5</Typography>
                    <ColorField field={formFields.colorfield} />
                    <FileField field={formFields.filefield} />
                    <TextField field={formFields.textfield} />
                    <MultiFileField field={formFields.multifilefield} />
                    <MultiChoiceField field={formFields.multichoicefield} />
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default {
    title: 'Examples/ExampleForm5',
    component: ExampleForm5,
};

export const Default = ExampleForm5;

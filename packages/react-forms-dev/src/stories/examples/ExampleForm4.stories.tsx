import React from 'react';

import {Form} from 'react-forms-store';
import {
    DateField,
    FileField,
    MultiChoiceField,
    NumberField,
    TextField,
} from 'react-forms-store';

import {Box, Button, Container, Typography} from '@mui/material';

const formFields = {
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
    numberfield: new NumberField({
        label: 'Number Field',
        initValue: 50,
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'Number Field is required.',
            },
        ],
    }),
};

const form = new Form(formFields);

const ExampleForm4: React.FC = () => {
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
                    <Typography variant="h6">Example Form 4</Typography>
                    <FileField field={formFields.filefield} />
                    <TextField field={formFields.textfield} />
                    <MultiChoiceField field={formFields.multichoicefield} />
                    <DateField field={formFields.datefield} />
                    <NumberField field={formFields.numberfield} />
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default {
    title: 'Examples/ExampleForm4',
    component: ExampleForm4,
};

export const Default = ExampleForm4;

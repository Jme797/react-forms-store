import React from 'react';

import {Form} from 'react-forms-store';
import {
    ChoiceField,
    FileField,
    MultiChoiceField,
    MultiFileField,
    NumberField,
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

const ExampleForm3: React.FC = () => {
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
                    <Typography variant="h6">Example Form 3</Typography>
                    <FileField field={formFields.filefield} />
                    <ChoiceField field={formFields.choicefield} />
                    <MultiChoiceField field={formFields.multichoicefield} />
                    <MultiFileField field={formFields.multifilefield} />
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
    title: 'Examples/ExampleForm3',
    component: ExampleForm3,
};

export const Default = ExampleForm3;

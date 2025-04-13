import React from 'react';

import {Fieldset, Form, TextField} from 'react-forms-store';

import {TextInput} from 'react-forms-store-ux';

import {Box, Button, Container, Typography} from '@mui/material';

const formFields = {
    fieldset: new Fieldset({
        name: new TextField({label: 'Fieldset name'}),
    }),
};

const form = new Form(formFields);

const RegistrationForm: React.FC = () => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        void form.submit(data => {
            console.log('Form submitted with data:', data);
            alert('Form submitted!');
        });
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Box sx={{mb: 2}}>
                    <Typography variant="h6">Registration Form</Typography>
                    <TextInput field={formFields.fieldset.fields.name} />
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default {
    title: 'Examples/RegistrationForm',
    component: RegistrationForm,
};

export const Default = RegistrationForm;

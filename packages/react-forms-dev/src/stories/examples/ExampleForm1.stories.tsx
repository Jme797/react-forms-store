import React from 'react';

import {
    ChoiceField,
    DateField,
    FileField,
    Form,
    NumberField,
    TextField,
} from 'react-forms-store';

import {
    DateInput,
    FilePicker,
    NumberInput,
    SelectInput,
    TextInput,
} from 'react-forms-store-ux';

import {Box, Button, Container, Typography} from '@mui/material';

const formFields = {
    firstName: new TextField({
        label: 'First Name',
        initValue: '',
        required: true,
        validation: [
            {
                rule: value => value !== undefined && value.trim() !== '',
                error: 'First Name is required.',
            },
        ],
    }),
    lastName: new TextField({
        label: 'Last Name',
        initValue: '',
        required: true,
        validation: [
            {
                rule: value => value !== undefined && value.trim() !== '',
                error: 'Last Name is required.',
            },
        ],
    }),
    email: new TextField({
        label: 'Email',
        initValue: '',
        required: true,
        validation: [
            {
                rule: value => value !== undefined && value.trim() !== '',
                error: 'Email is required.',
            },
            {
                rule: value => /\S+@\S+\.\S+/.test(value),
                error: 'Email is not valid.',
            },
        ],
    }),
    age: new NumberField({
        label: 'Age',
        initValue: undefined,
        min: 0,
        max: 120,
        required: true,
    }),
    gender: new ChoiceField({
        label: 'Gender',
        choices: [
            {label: 'Male', value: 'male'},
            {label: 'Female', value: 'female'},
            {label: 'Other', value: 'other'},
        ],
        required: true,
    }),
    birthDate: new DateField({
        label: 'Birth Date',
        initValue: undefined,
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'Birth Date is required.',
            },
        ],
    }),
    profilePicture: new FileField({
        label: 'Profile Picture',
        initValue: undefined,
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'Profile Picture is required.',
            },
        ],
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
                    <TextInput field={formFields.firstName} />
                    <TextInput field={formFields.lastName} />
                    <TextInput field={formFields.email} />
                    <NumberInput field={formFields.age} />
                    <SelectInput field={formFields.gender} />
                    <DateInput field={formFields.birthDate} />
                    <FilePicker field={formFields.profilePicture} />
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

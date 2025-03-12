import React from 'react';

import {Form} from 'react-forms-store';
import {
    DateField,
    FileField,
    MultipleFileField,
    TextField,
} from 'react-forms-store';

import {DateInput, FilePicker, TextInput} from 'react-forms-store-ux';

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
    phoneNumber: new TextField({
        label: 'Phone Number',
        initValue: '',
        required: true,
        validation: [
            {
                rule: value => value !== undefined && value.trim() !== '',
                error: 'Phone Number is required.',
            },
        ],
    }),
    address: new TextField({
        label: 'Address',
        initValue: '',
        required: true,
        validation: [
            {
                rule: value => value !== undefined && value.trim() !== '',
                error: 'Address is required.',
            },
        ],
    }),
    dateOfBirth: new DateField({
        label: 'Date of Birth',
        initValue: undefined,
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'Date of Birth is required.',
            },
        ],
    }),
    resume: new FileField({
        label: 'Resume',
        initValue: undefined,
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'Resume is required.',
            },
        ],
    }),
    coverLetter: new MultipleFileField({
        label: 'Cover Letter',
        initValue: undefined,
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'Cover Letter is required.',
            },
        ],
    }),
};

const form = new Form(formFields);

const ApplicationForm: React.FC = () => {
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
                    <Typography variant="h6">Application Form</Typography>
                    <TextInput field={formFields.firstName} />
                    <TextInput field={formFields.lastName} />
                    <TextInput field={formFields.email} />
                    <TextInput field={formFields.phoneNumber} />
                    <TextInput field={formFields.address} />
                    <DateInput field={formFields.dateOfBirth} />
                    <Box sx={{mt: 2}}>
                        <FilePicker field={formFields.resume} />
                    </Box>
                    <Box sx={{mt: 2}}>
                        <FilePicker field={formFields.coverLetter} />
                    </Box>
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default {
    title: 'Examples/ApplicationForm',
    component: ApplicationForm,
};

export const Default = ApplicationForm;

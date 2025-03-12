import {useSyncExternalStore} from 'use-sync-external-store/shim';

import React, {useEffect, useRef} from 'react';

import {MultiPartForm} from 'react-forms-store';
import {
    DateField,
    FileField,
    MultipleFileField,
    TextField,
} from 'react-forms-store';

import {DateInput, FilePicker, TextInput} from 'react-forms-store-ux';

import {
    Box,
    Button,
    Container,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';

const formFields = {
    personalInfo: {
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
    },
    contactInfo: {
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
    },
    documents: {
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
    },
};

const form = new MultiPartForm(formFields);

const steps = ['Personal Info', 'Contact Info', 'Documents'];

const MultiPartFormExample: React.FC = () => {
    const currentStep = useSyncExternalStore(
        form.subscribe,
        () => form.currentStep,
        () => form.currentStep
    );

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (formRef.current) {
            formRef.current.focus();
        }
    }, [currentStep]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        void form.submitStep(data => {
            console.log('Form submitted with data:', data);
            alert('Form submitted!');
        });
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit} ref={formRef} tabIndex={-1}>
                <Box
                    sx={{
                        mb: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                    }}
                >
                    <Typography variant="h6">Application Form</Typography>
                    <Stepper activeStep={form.steps.indexOf(currentStep)}>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {currentStep === 'personalInfo' && (
                            <>
                                <TextInput
                                    field={
                                        form.forms.personalInfo.fields.firstName
                                    }
                                />
                                <TextInput
                                    field={
                                        form.forms.personalInfo.fields.lastName
                                    }
                                />
                                <DateInput
                                    field={
                                        form.forms.personalInfo.fields
                                            .dateOfBirth
                                    }
                                />
                            </>
                        )}
                        {currentStep === 'contactInfo' && (
                            <>
                                <TextInput
                                    field={form.forms.contactInfo.fields.email}
                                />
                                <TextInput
                                    field={
                                        form.forms.contactInfo.fields
                                            .phoneNumber
                                    }
                                />
                                <TextInput
                                    field={
                                        form.forms.contactInfo.fields.address
                                    }
                                />
                            </>
                        )}
                        {currentStep === 'documents' && (
                            <>
                                <Box sx={{mt: 2}}>
                                    <FilePicker
                                        field={
                                            form.forms.documents.fields.resume
                                        }
                                    />
                                </Box>
                                <Box sx={{mt: 2}}>
                                    <FilePicker
                                        field={
                                            form.forms.documents.fields
                                                .coverLetter
                                        }
                                    />
                                </Box>
                            </>
                        )}
                    </div>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={form.previousStep}
                        disabled={currentStep === form.steps[0]}
                    >
                        Previous
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={form.nextStep}
                        disabled={
                            currentStep === form.steps[form.steps.length - 1]
                        }
                    >
                        Next
                    </Button>
                </Box>
                {currentStep === form.steps[form.steps.length - 1] && (
                    <Box sx={{mt: 2}}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Box>
                )}
            </form>
        </Container>
    );
};

export default {
    title: 'Examples/MultiPartFormExample',
    component: MultiPartFormExample,
};

export const Default = MultiPartFormExample;

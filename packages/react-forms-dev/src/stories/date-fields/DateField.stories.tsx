import {Meta, StoryFn} from '@storybook/react';

import React from 'react';

import {DateField, Form} from 'react-forms-store';

import {DateInput} from 'react-forms-store-ux';

export default {
    title: 'Date Fields/DateField',
    component: DateInput,
} as Meta;

const Template: StoryFn = args => {
    const dateField = new DateField({
        label: 'Date of Birth',
        initValue: undefined,
        min: new Date('1900-01-01'),
        max: new Date(),
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'A date must be selected.',
            },
        ],
    });

    const dateTimeField = new DateField({
        label: 'Appointment Date and Time',
        initValue: undefined,
        min: new Date(),
        required: true,
        dateTime: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'A date and time must be selected.',
            },
        ],
    });

    const form = new Form({
        dateOfBirth: dateField,
        appointmentDateTime: dateTimeField,
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        void form.submit(data => {
            console.log('Form submitted with data:', data);
            alert('Form submitted!');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}
            >
                <DateInput field={dateField} {...args} />
                <DateInput field={dateTimeField} {...args} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export const Default = Template.bind({});
Default.args = {};

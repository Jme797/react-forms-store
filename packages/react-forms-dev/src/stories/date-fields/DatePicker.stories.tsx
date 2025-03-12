import {Meta, StoryFn} from '@storybook/react';

import React from 'react';

import {DateField, Form} from 'react-forms-store';

import {DatePickerInput} from 'react-forms-store-ux';

export default {
    title: 'Date Fields/DatePicker',
    component: DatePickerInput,
} as Meta;

const Template: StoryFn = args => {
    const dateField = new DateField({
        label: 'Date of Birth',
        initValue: undefined,
        min: new Date('2001-01-01'),
        max: new Date(),
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'A date must be selected.',
            },
        ],
    });

    const form = new Form({
        dateOfBirth: dateField,
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
                <DatePickerInput field={dateField} {...args} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export const Default = Template.bind({});
Default.args = {};

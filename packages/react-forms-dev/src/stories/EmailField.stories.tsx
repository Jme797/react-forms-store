import {Meta, StoryFn} from '@storybook/react';

import {Form, TextField} from 'react-forms-store';

import {EmailInput} from 'react-forms-store-ux';

export default {
    title: 'Text Fields/EmailField',
    component: EmailInput,
} as Meta;

const Template: StoryFn = args => {
    const emailField = new TextField({
        label: 'Email',
        initValue: '',
        required: true,
        helpText: 'Please enter your email address.',
        validation: [
            {
                rule: value => /\S+@\S+\.\S+/.test(value),
                error: 'Please enter a valid email address.',
            },
        ],
    });

    const form = new Form({
        email: emailField,
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        form.submit(async data => {
            console.log('Form submitted with data:', data);
            alert('Form submitted!');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <EmailInput field={emailField} {...args} />
            <button type="submit">Submit</button>
        </form>
    );
};

export const Default = Template.bind({});
Default.args = {};

import {Meta, StoryFn} from '@storybook/react';

import {Form, TextField} from 'react-forms-store';

import {PasswordInput} from 'react-forms-store-ux';

export default {
    title: 'Text Fields/PasswordField',
    component: PasswordInput,
} as Meta;

const Template: StoryFn = args => {
    const passwordField = new TextField({
        label: 'Password',
        initValue: '',
        required: true,
        helpText: 'Please enter your password.',
        validation: [
            {
                rule: value => value.trim().length >= 8,
                error: 'Password must be at least 8 characters long.',
            },
        ],
    });

    const form = new Form({
        password: passwordField,
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
            <PasswordInput field={passwordField} {...args} />
            <button type="submit">Submit</button>
        </form>
    );
};

export const Default = Template.bind({});
Default.args = {};

import {Meta, StoryFn} from '@storybook/react';

import {Form, TextField} from 'react-forms-store';

import {TextInput} from 'react-forms-store-ux';

export default {
    title: 'Text Fields/TextField',
    component: TextInput,
} as Meta;

const Template: StoryFn = args => {
    const textField = new TextField({
        label: 'Name',
        initValue: '',
        required: true,
        helpText: 'Please enter your name.',
        validation: [
            {
                rule: value => /^[a-zA-Z\s]+$/.test(value),
                error: 'Name must contain only letters and spaces.',
            },
        ],
    });

    const form = new Form({
        name: textField,
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
            <TextInput field={textField} {...args} />
            <button type="submit">Submit</button>
        </form>
    );
};

export const Default = Template.bind({});
Default.args = {};

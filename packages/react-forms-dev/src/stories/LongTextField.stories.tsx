import {DocsContainer, DocsPage} from '@storybook/addon-docs';
import {Meta, StoryFn} from '@storybook/react';

import {Form, TextField} from 'react-forms-store';

import {LongTextInput} from 'react-forms-store-ux';

export default {
    title: 'Text Fields/LongTextField',
    component: LongTextInput,
    parameters: {
        docs: {
            container: DocsContainer,
            page: DocsPage,
        },
    },
} as Meta;

const Template: StoryFn = args => {
    const longTextField = new TextField({
        label: 'Description',
        initValue: '',
        required: true,
        helpText: 'Please enter a detailed description.',
        validation: [
            {
                rule: value => value.trim().length >= 10,
                error: 'Description must be at least 10 characters long.',
            },
        ],
    });

    const form = new Form({
        description: longTextField,
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
            <LongTextInput field={longTextField} {...args} />
            <button type="submit">Submit</button>
        </form>
    );
};

export const Default = Template.bind({});
Default.args = {};

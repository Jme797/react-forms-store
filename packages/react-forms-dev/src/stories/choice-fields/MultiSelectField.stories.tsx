import {Meta, StoryFn} from '@storybook/react';

import React from 'react';

import {Form, MultipleChoiceField, OptionBase} from 'react-forms-store';

import {MultipleSelectInput} from 'react-forms-store-ux';

export default {
    title: 'Choice Fields/MultipleSelectInput',
    component: MultipleSelectInput,
} as Meta;

const Template: StoryFn = args => {
    const options: OptionBase[] = [
        {value: 1, label: 'Option 1'},
        {value: 2, label: 'Option 2'},
        {value: 3, label: 'Option 3'},
    ];

    const multipleChoiceField = new MultipleChoiceField<OptionBase>({
        label: 'Multiple Choice',
        initValue: [],
        choices: options,
        required: true,
        validation: [
            {
                rule: value => Array.isArray(value) && value.length > 0,
                error: 'At least one choice must be selected.',
            },
        ],
    });

    const form = new Form({
        multipleChoice: multipleChoiceField,
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
            <MultipleSelectInput field={multipleChoiceField} {...args} />
            <button type="submit">Submit</button>
        </form>
    );
};

export const Default = Template.bind({});
Default.args = {};

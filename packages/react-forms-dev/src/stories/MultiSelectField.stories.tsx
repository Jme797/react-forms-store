import {Meta, StoryFn} from '@storybook/react';

import React from 'react';

import {Form, MultipleChoiceField} from 'react-forms-store';

import {MultipleSelectInput} from 'react-forms-store-ux';

export default {
    title: 'Fields/MultipleSelectInput',
    component: MultipleSelectInput,
} as Meta;

const Template: StoryFn = args => {
    type Option = {
        id: number;
        label: string;
    };

    const options: Option[] = [
        {id: 1, label: 'Option 1'},
        {id: 2, label: 'Option 2'},
        {id: 3, label: 'Option 3'},
    ];

    const multipleChoiceField = new MultipleChoiceField<Option>({
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

        form.submit(async data => {
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

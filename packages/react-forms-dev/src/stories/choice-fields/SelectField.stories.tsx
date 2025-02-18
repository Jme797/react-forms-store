import {Meta, StoryFn} from '@storybook/react';

import React from 'react';

import {ChoiceField, Form} from 'react-forms-store';

import {SelectInput} from 'react-forms-store-ux';

export default {
    title: 'Choice Fields/SingleSelectInput',
    component: SelectInput,
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

    const singleChoiceField = new ChoiceField<Option>({
        label: 'Single Choice',
        initValue: options[0],
        choices: options,
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'A choice must be selected.',
            },
        ],
    });

    const form = new Form({
        singleChoice: singleChoiceField,
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
            <SelectInput field={singleChoiceField} {...args} />
            <button type="submit">Submit</button>
        </form>
    );
};

export const Default = Template.bind({});
Default.args = {};

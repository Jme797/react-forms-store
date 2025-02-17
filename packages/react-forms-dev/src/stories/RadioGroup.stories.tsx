import {Meta, StoryFn} from '@storybook/react';

import React from 'react';

import {ChoiceField, Form} from 'react-forms-store';

import {RadioGroupInput} from 'react-forms-store-ux';

export default {
    title: 'Fields/RadioGroupInput',
    component: RadioGroupInput,
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

    const choiceField = new ChoiceField<Option>({
        label: 'Radio Group',
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
        radioGroup: choiceField,
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
            <RadioGroupInput field={choiceField} {...args} />
            <button type="submit">Submit</button>
        </form>
    );
};

export const Default = Template.bind({});
Default.args = {};

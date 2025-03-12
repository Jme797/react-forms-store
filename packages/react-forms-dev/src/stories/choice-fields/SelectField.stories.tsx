import {Meta, StoryFn} from '@storybook/react';

import React from 'react';

import {ChoiceField, Form, OptionBase} from 'react-forms-store';

import {SelectInput} from 'react-forms-store-ux';

export default {
    title: 'Choice Fields/SingleSelectInput',
    component: SelectInput,
} as Meta;

const Template: StoryFn = args => {
    const options: OptionBase[] = [
        {value: 1, label: 'Option 1'},
        {value: 2, label: 'Option 2'},
        {value: 3, label: 'Option 3'},
    ];

    const singleChoiceField = new ChoiceField<OptionBase>({
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

        void form.submit(data => {
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

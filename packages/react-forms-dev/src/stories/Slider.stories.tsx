import {Meta, StoryFn} from '@storybook/react';

import {Form, NumberField} from 'react-forms-store';

import {SliderInput} from 'react-forms-store-ux';

export default {
    title: 'Fields/SliderField',
    component: SliderInput,
} as Meta;

const Template: StoryFn = args => {
    const numberField = new NumberField({
        label: 'Age',
        initValue: undefined,
        required: true,
        helpText: 'Please enter your age.',
        min: 0,
        max: 120,
        step: 1,
        validation: [
            {
                rule: value => value !== undefined && value >= 0,
                error: 'Age must be a positive number.',
            },
            {
                rule: value => value !== undefined && value <= 120,
                error: 'Age must be less than or equal to 120.',
            },
        ],
    });

    const form = new Form({
        age: numberField,
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
            <SliderInput field={numberField} {...args} />
            <button type="submit">Submit</button>
        </form>
    );
};

export const Default = Template.bind({});
Default.args = {};

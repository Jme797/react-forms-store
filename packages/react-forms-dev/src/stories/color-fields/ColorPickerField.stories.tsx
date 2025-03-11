import {Meta, StoryFn} from '@storybook/react';

import React from 'react';

import {Form} from 'react-forms-store';
import {ColorField} from 'react-forms-store';

import {ColorPicker} from 'react-forms-store-ux';

import {Box, Button, Container} from '@mui/material';

export default {
    title: 'Color fields/ColorPicker',
    component: ColorPicker,
} as Meta;

const Template: StoryFn = args => {
    const colorField = new ColorField({
        label: 'Pick a Color',
        initValue: '#ff0000',
        format: 'rgba',
        required: true,
        validation: [
            {
                rule: value => value !== undefined,
                error: 'A color must be selected.',
            },
        ],
    });

    const form = new Form({
        color: colorField,
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        form.submit(async data => {
            console.log('Form submitted with data:', data);
            alert('Form submitted!');
        });
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Box sx={{mb: 2}}>
                    <ColorPicker field={colorField} {...args} />
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export const Default = Template.bind({});
Default.args = {};

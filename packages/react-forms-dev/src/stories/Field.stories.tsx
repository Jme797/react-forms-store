import {Meta, StoryFn} from '@storybook/react';

import HelloWorld from 'react-forms-store-ux';

export default {
    title: 'Example/HelloWorld',
    component: HelloWorld,
} as Meta;

const Template: StoryFn = args => <HelloWorld {...args} />;

export const Default = Template.bind({});
Default.args = {};

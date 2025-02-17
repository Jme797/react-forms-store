import {Meta, StoryFn} from '@storybook/react';

const HelloWorld = () => {
    return <h1>Hello, World!</h1>;
};

export default {
    title: 'Example/HelloWorld',
    component: HelloWorld,
} as Meta;

const Template: StoryFn = args => <HelloWorld {...args} />;

export const Default = Template.bind({});
Default.args = {};

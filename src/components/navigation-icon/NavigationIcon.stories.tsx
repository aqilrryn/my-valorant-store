import React from 'react';
import type { Story } from '@storybook/react/types-6-0';

import NavigationIcon from './NavigationIcon';

export default {
  title: 'NavigationIcon',
  component: NavigationIcon,
};

const Template: Story = props => <NavigationIcon {...props} />;

export const Default = Template.bind({});
Default.args = { icon: 'info', size: 20 };

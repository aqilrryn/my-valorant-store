import React from 'react';
import type { Story } from '@storybook/react/types-6-0';

import Countdown from './Countdown';

export default {
  title: 'Countdown',
  component: Countdown,
};

const Template: Story = props => <Countdown {...props} />;

export const Default = Template.bind({});
Default.args = {};

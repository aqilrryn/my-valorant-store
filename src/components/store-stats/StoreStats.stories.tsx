import React from 'react';
import type { Story } from '@storybook/react/types-6-0';

import StoreStats from './StoreStats';

export default {
  title: 'StoreStats',
  component: StoreStats,
};

const Template: Story = props => <StoreStats {...props} />;

export const Default = Template.bind({});
Default.args = {
  loading: false,
  valorantPoints: 2000,
  radianitePoints: 45,
};

export const Loading = Template.bind({});
Loading.args = { ...Default.args, loading: true };

import React from 'react'
import type { Story } from '@storybook/react/types-6-0'

import CustomButton from './CustomButton'

export default {
  title: 'CustomButton',
  component: CustomButton,
}

const Template: Story = props => <CustomButton {...props}>Button</CustomButton>

export const Default = Template.bind({})
Default.args = { loading: false }

export const Loading = Template.bind({})
Loading.args = { loading: true }

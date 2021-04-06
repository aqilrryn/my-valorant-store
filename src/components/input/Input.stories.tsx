import React from 'react'
import type { Story } from '@storybook/react/types-6-0'

import Input from './Input'

export default {
  title: 'Input',
  component: Input,
}

const Template: Story = props => <Input {...props} defaultValue="Jane Doe" />

export const Default = Template.bind({})
Default.args = {}

export const Password = Template.bind({})
Password.args = { type: 'password' }

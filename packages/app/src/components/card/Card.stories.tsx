import React from 'react'
import type { Story } from '@storybook/react/types-6-0'
import Card from './Card'

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    name: {
      description: 'The weapon name',
      type: 'string',
      defaultValue: 'Singularity Ares',
    },
    thumbnail: {
      description: 'The weapon thumbnail',
      type: 'string',
      defaultValue:
        'https://media.valorant-api.com/weaponskins/e901bdeb-405f-d06c-0733-6783274d85b0/displayicon.png',
    },
    price: {
      description: 'The weapon price',
      type: 'number',
      defaultValue: '2000',
    },
    loading: {
      description: 'The card loading variant',
      type: 'boolean',
    },
  },
}

const Template: Story = props => (
  <Card name="" thumbnail="" price={0} {...props} />
)

export const Normal = Template.bind({})
Normal.args = {}

export const Loading = Template.bind({})
Loading.args = { loading: true }

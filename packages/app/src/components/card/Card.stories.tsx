import React from 'react'
import type { Story } from '@storybook/react/types-6-0'

import Card from './Card'

export default {
  title: 'Card',
  component: Card,
}

const Template: Story = props => <Card {...props} />

export const Default = Template.bind({})
Default.args = {
  skin: {
    name: 'Singularity Ares',
    thumbnail:
      'https://media.valorant-api.com/weaponskins/e901bdeb-405f-d06c-0733-6783274d85b0/displayicon.png',
    price: 2000,
  },
  loading: false,
}

export const Loading = Template.bind({})
Loading.args = { loading: true, skin: undefined }

export const NoThumbnail = Template.bind({})
NoThumbnail.args = {
  ...Default.args,
  skin: { ...Default.args.skin, thumbnail: undefined },
}

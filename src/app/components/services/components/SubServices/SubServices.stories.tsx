import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {SubServices} from './SubServices';

const meta: Meta<typeof SubServices> = {
  component: SubServices,
};

export default meta;

type Story = StoryObj<typeof SubServices>;

export const Basic: Story = {args: {}};

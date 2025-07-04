import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {SubServicesDialog} from './SubServicesDialog';

const meta: Meta<typeof SubServicesDialog> = {
  component: SubServicesDialog,
};

export default meta;

type Story = StoryObj<typeof SubServicesDialog>;

export const Basic: Story = {args: {}};

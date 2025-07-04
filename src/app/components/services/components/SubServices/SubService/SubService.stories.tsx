import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {SubService} from './SubService';

const meta: Meta<typeof SubService> = {
  component: SubService,
};

export default meta;

type Story = StoryObj<typeof SubService>;

export const Basic: Story = {args: {}};

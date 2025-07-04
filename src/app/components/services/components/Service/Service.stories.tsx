import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {Service} from './Service';

const meta: Meta<typeof Service> = {
  component: Service,
};

export default meta;

type Story = StoryObj<typeof Service>;

export const Basic: Story = {args: {}};

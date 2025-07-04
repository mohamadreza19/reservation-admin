import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {ServiceAvatar} from './ServiceAvatar';

const meta: Meta<typeof ServiceAvatar> = {
  component: ServiceAvatar,
};

export default meta;

type Story = StoryObj<typeof ServiceAvatar>;

export const Basic: Story = {args: {}};

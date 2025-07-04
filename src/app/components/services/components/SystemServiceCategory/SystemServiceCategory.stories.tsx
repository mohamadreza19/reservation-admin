import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {SystemServiceCategory} from './SystemServiceCategory';

const meta: Meta<typeof SystemServiceCategory> = {
  component: SystemServiceCategory,
};

export default meta;

type Story = StoryObj<typeof SystemServiceCategory>;

export const Basic: Story = {args: {}};

import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {TimeSchedule} from './TimeSchedule';

const meta: Meta<typeof TimeSchedule> = {
  component: TimeSchedule,
};

export default meta;

type Story = StoryObj<typeof TimeSchedule>;

export const Basic: Story = {args: {}};

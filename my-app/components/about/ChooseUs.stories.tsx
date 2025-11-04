import type { Meta, StoryObj } from '@storybook/react';
import ChooseUs, { type ChooseUsProps } from './chooseUs';
import { Users, Target, RefreshCw, Award } from 'lucide-react';

const meta: Meta<ChooseUsProps> = {
  title: 'About/ChooseUs',
  component: ChooseUs,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<ChooseUsProps>;

export const Default: Story = {
  args: {},
};

export const CustomContent: Story = {
  args: {
    title: 'Why Partner With Us',
    subtitle: 'We deliver outcomes through expertise, clarity, and relentless focus.',
    features: [
      {
        icon: <Award className="w-10 h-10" aria-hidden="true" />,
        title: 'Award-Winning Team',
        description: 'Recognized for excellence across multiple domains and industries.',
        accent: 'blue',
      },
      {
        icon: <Target className="w-10 h-10" aria-hidden="true" />,
        title: 'Outcome Focused',
        description: 'We start with goals and measure progress with clear metrics.',
        accent: 'yellow',
      },
      {
        icon: <RefreshCw className="w-10 h-10" aria-hidden="true" />,
        title: 'Built to Adapt',
        description: 'Our solutions evolve with your business and market needs.',
        accent: 'green',
      },
      {
        icon: <Users className="w-10 h-10" aria-hidden="true" />,
        title: 'Trusted by Teams',
        description: 'We partner long-term and deliver consistent, reliable value.',
        accent: 'red',
      },
    ],
  },
};

export const CompactCards: Story = {
  args: {
    rounded: 'lg',
    showAccentGlow: false,
  },
};
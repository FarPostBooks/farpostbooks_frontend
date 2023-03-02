import { StoryObj } from '@storybook/html'
import { StorybookComponent } from '@/storybook'
import { Rating, RatingProps } from './rating'

export type Story = StoryObj<RatingProps>
export default {
  title: 'Molecules/Rating',
  render: (props: RatingProps) => <Rating {...props} />,
} as StorybookComponent<typeof Rating>

export const Default: Story = {
  args: {
    maximum: 5,
  },
}

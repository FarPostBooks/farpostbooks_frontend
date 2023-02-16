import { StoryObj, Meta } from '@storybook/html'
import { ComponentProps } from 'solid-js'
import { Button, ButtonProps } from './button'

type Story = StoryObj<ButtonProps>

export default {
  title: 'UIKit/Button',
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
  },

  render: (props: ButtonProps) => <Button {...props} />,
} as Meta<ComponentProps<typeof Button>>

export const Default: Story = {
  args: {
    text: 'Click me',
  },
}

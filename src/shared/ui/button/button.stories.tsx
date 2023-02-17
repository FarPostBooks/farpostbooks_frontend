import { StoryObj } from '@storybook/html'
import { StorybookComponent } from '@/storybook'
import { Button, ButtonProps } from './button'

type Story = StoryObj<ButtonProps>

export default {
  title: 'Atoms/Button',
  render: (props) => <Button {...props} />,
} as StorybookComponent<typeof Button>

export const Default: Story = { args: { text: 'Кнопка' } }

import { StoryObj } from '@storybook/html'
import { StorybookComponent } from '@/storybook'
import { Button, ButtonProps } from './button'

type Story = StoryObj<ButtonProps>

export default {
  title: 'Atoms/Button',
  render: (props) => <Button {...props} />,
} as StorybookComponent<typeof Button>

export const Fix: Story = {
  args: { variant: 'common', text: 'Кнопка', filling: 'fix', width: 200 },
}

export const Fit: Story = {
  args: { variant: 'common', text: 'Кнопка', filling: 'fit' },
}

export const Fill: Story = {
  args: { variant: 'common', text: 'Кнопка', filling: 'fill' },
}

export const Circled: Story = {
  args: {
    variant: 'circled',
    icon: () => <img src={'/Logout.svg'} />,
    light: false,
  },
}

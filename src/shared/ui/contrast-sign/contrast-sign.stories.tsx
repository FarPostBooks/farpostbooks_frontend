import { StoryObj } from '@storybook/html'
import { StorybookComponent } from '@/storybook'
import { ContrastSign, ContrastSignProps } from './contrast-sign'

type Story = StoryObj<ContrastSignProps>

export default {
  title: 'Atoms/ContrastSign',
  render: (props: ContrastSignProps) => <ContrastSign {...props} />,
} as StorybookComponent<typeof ContrastSign>

export const Warning: Story = {
  args: {
    text: 'Книгу уже взяли',
    variant: 'warning',
  },
}

export const Error: Story = {
  args: {
    text: 'Обязательное поле',
    variant: 'error',
  },
}

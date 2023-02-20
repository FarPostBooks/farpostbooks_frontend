import { StoryObj } from '@storybook/html'
import { StorybookComponent } from '@/storybook'
import { Header, HeaderProps } from './header'

type Story = StoryObj<HeaderProps>
export default {
  title: 'Atoms/Header',
  render: (props: HeaderProps) => <Header {...props} />,
} as StorybookComponent<typeof Header>

export const H1: Story = {
  args: {
    text: 'Загаловок',
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    ...H1.args,
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    ...H1.args,
    variant: 'h3',
  },
}
export const H4: Story = {
  args: {
    ...H1.args,
    variant: 'h4',
  },
}

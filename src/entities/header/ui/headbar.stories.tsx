import { StoryObj } from '@storybook/html'
import { StorybookComponent } from '@/storybook'
import { Headbar, HeadbarProps } from './headbar'

type Story = StoryObj<HeadbarProps>

export default {
  title: 'Molecules/Headbar',
  render: (props: HeadbarProps) => <Headbar {...props} />,
} as StorybookComponent<typeof Headbar>

export const OnlyTitle: Story = {
  args: {
    title: 'Заголовок',
  },
}

export const WithArrowBack: Story = {
  args: {
    ...OnlyTitle.args,
    onBack: () => alert('back button click handler'),
  },
}

export const WithLogout: Story = {
  args: {
    ...OnlyTitle.args,
    onLogout: () => alert('logout button click handler'),
  },
}

export const WithBothBackAndLogout: Story = {
  args: {
    ...WithArrowBack.args,
    ...WithLogout.args,
  },
}

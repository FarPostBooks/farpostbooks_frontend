import { StoryObj } from '@storybook/html'
import { StorybookComponent } from '@/storybook'
import { NotificationPopup, NotificationPopupProps } from './notification'

type Story = StoryObj<NotificationPopupProps>
export default {
  title: 'Molecules/Notification',
  render: (props) => <NotificationPopup {...props} />,
} as StorybookComponent<typeof NotificationPopup>

export const Default: Story = {
  args: {
    message: 'Что-то пошло не так',
  },
}

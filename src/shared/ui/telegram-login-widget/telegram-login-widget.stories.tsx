import { StoryObj } from '@storybook/html'
import { StorybookComponent } from '@/storybook'
import { TelegramLoginWidget } from './telegram-login-widget'
import { TelegramLoginWidgetProps } from './types'

export default {
  title: 'Atoms/TelegramLoginWidget',
  render: (props) => <TelegramLoginWidget {...props} />,
} as StorybookComponent<typeof TelegramLoginWidget>

export const Default: StoryObj<TelegramLoginWidgetProps> = {
  args: {
    botName: 'fb_auth_bot',
    dataOnAuth: (data) => {
      console.log(data)
    },
    borderRadius: 12,
  },
}

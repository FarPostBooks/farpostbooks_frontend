import { StoryObj } from '@storybook/html'
import { StorybookComponent } from '@/storybook'
import { Card, CardProps } from './card'

type Story = StoryObj<CardProps>

export default {
  title: 'Molecules/Book/Card',
  render: (props: CardProps) => <Card {...props} />,
} as StorybookComponent<typeof Card>

export const Default: Story = {
  args: {
    name: 'Чистая архитектура. Искусство разработки программного обеспечения',
    id: 9785446107728,
    image:
      'https://img4.labirint.ru/rc/e90f92e826c3b5b96d09a52a064ab698/363x561q80/books64/634082/cover.jpg?1598959632',
  },
}

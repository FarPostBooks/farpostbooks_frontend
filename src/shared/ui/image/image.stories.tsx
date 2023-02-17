import { StoryObj } from '@storybook/html'
import { FixedWidthContainer, StorybookComponent, StoryFnReturnType } from '@/storybook'
import { Image, ImageProps } from './image'

type Story = StoryObj<ImageProps>

export default {
  title: 'Atoms/Image',
  render: (props: ImageProps) => <Image {...props} />,
} as StorybookComponent<typeof Image>

export const Compact: Story = {
  args: {
    src: 'https://img4.labirint.ru/rc/e90f92e826c3b5b96d09a52a064ab698/363x561q80/books64/634082/cover.jpg?1598959632',
    alt: 'Обложка книги',
    variant: 'compact',
  },
}

export const Filling: Story = {
  args: {
    src: 'https://img4.labirint.ru/rc/e90f92e826c3b5b96d09a52a064ab698/363x561q80/books64/634082/cover.jpg?1598959632',
    alt: 'Обложка книги',
    variant: 'filling',
  },
}

Filling.decorators = [
  (Story) =>
    (
      <FixedWidthContainer width={500}>
        <Story />
      </FixedWidthContainer>
    ) as StoryFnReturnType<ImageProps>,
]

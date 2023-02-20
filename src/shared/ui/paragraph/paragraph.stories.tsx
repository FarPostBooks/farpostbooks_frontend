import { StoryObj } from '@storybook/html'
import { StorybookComponent } from '@/storybook'
import { Paragraph, ParagraphProps } from './paragraph'

type Story = StoryObj<ParagraphProps>

export default {
  title: 'Atoms/Paragraph',
  render: (props: ParagraphProps) => (
    <div
      style={{
        background: '#ffffff',
        width: '200px',
      }}
    >
      <Paragraph>{props.children}</Paragraph>
    </div>
  ),
} as StorybookComponent<typeof Paragraph>

export const Default: Story = {
  args: {
    children:
      'ПараграфПараграфПараграфПараграфПараграфПараграфПараграфПараграфПараграфПараграфПараграфПараграфПарагра',
  },
}

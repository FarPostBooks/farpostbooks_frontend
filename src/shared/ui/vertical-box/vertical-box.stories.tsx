import { StoryObj } from '@storybook/html'
import { For } from 'solid-js'
import { StorybookComponent } from '@/storybook'
import { VerticalBox, VerticalBoxProps } from './vertical-box'

type Story = StoryObj<VerticalBoxProps>

export default {
  title: 'Layouts/VerticalBox',
  render: (props) => <VerticalBox {...props} />,
} as StorybookComponent<typeof VerticalBox>

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    components: (
      <For each={[0, 0, 0]}>
        {() => (
          <div
            style={{
              'background-color': '#777',
              width: '30px',
              height: '30px',
              'border-radius': '4px',
            }}
          />
        )}
      </For>
    ),
    gap: 8,
    padding: 4,
  },
}

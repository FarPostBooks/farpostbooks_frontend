import { StoryObj } from '@storybook/html'
import { For } from 'solid-js'
import { StorybookComponent } from '@/storybook'
import { FlexBox, FlexBoxProps } from './flex-box'

type Story = StoryObj<FlexBoxProps>

export default {
  title: 'Layouts/FlexBox',
  render: (props) => <FlexBox {...props} />,
} as StorybookComponent<typeof FlexBox>

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
    gap: '0px',
    padding: '0px',
  },
}

export const Modifiable: Story = {
  args: {
    ...Default.args,
    direction: 'toleft',
    hFilling: 'fill',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

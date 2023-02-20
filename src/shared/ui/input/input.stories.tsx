import { StoryObj } from '@storybook/html'
import { StorybookComponent } from '@/storybook'
import { Input } from './input'
import { InputProps } from './types'

type Story = StoryObj<InputProps>

export default {
  title: 'Atoms/Input',
  render: (props: InputProps) => <Input {...props} />,
  argTypes: {
    variant: { control: 'select', options: ['text', 'textarea', 'withIcon'] },
    filling: { control: 'select', options: ['fill', 'fit', 'fix'] },
    width: { control: 'number' },
  },
} as StorybookComponent<typeof Input>

export const InputText: Story = {
  args: {
    variant: 'text',
    value: '',
    placeholder: 'Плейсхолдер',
  },
}

export const InputTextError: Story = {
  args: {
    ...InputText.args,
    error: 'Обязательное поле',
  },
}

export const Textarea: Story = {
  args: {
    ...InputText.args,
    variant: 'textarea',
  },
  argTypes: {
    verticalFilling: { control: 'select', options: ['fill', 'fit', 'fix'] },
    height: { control: 'number' },
  },
}

export const InputTextWithIcon: Story = {
  args: {
    ...InputText.args,
    variant: 'withIcon',
    icon: <img src="/Search.svg" />,
  },
}

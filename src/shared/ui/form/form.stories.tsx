import { StoryObj } from '@storybook/html'
import { StorybookComponent } from '@/storybook'
import { Button } from '../button'
import { Input } from '../input'
import { Form, FormProps } from './form'

type Story = StoryObj<FormProps>

export default {
  title: 'Atoms/Form',
  render: (props: FormProps) => <Form {...props} />,
} as StorybookComponent<typeof Form>

export const FilledForm: Story = {
  args: {
    children: (
      <>
        <Input
          variant="text"
          placeholder="Фамилия"
          value=""
          filling="fill"
          verticalFilling="fit"
        />
        <Input
          variant="text"
          placeholder="Имя"
          value=""
          filling="fill"
          verticalFilling="fit"
        />
        <Input
          variant="text"
          placeholder="Должность"
          value=""
          filling="fill"
          verticalFilling="fit"
        />
        <Input
          variant="textarea"
          placeholder="Предпочтения"
          value=""
          filling="fill"
          verticalFilling="grow"
        />
        <Button variant="common" text="Зарегестрироваться" filling="fill" />
      </>
    ),
    vFilling: 'fill',
    hFilling: 'fill',
  },
}

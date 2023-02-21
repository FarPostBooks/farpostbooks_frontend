import { Button, Form, Input } from '@/shared/ui'

export const SignupForm = () => {
  return (
    <Form vFilling="grow" hFilling="fill">
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
    </Form>
  )
}

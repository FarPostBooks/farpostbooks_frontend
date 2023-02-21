import { Headbar } from '@/entities/headbar'
import { Button, FlexBox, Form, Input } from '@/shared/ui'

export const Signup = () => {
  return (
    <FlexBox
      direction="tobottom"
      gap="20px"
      padding="20px 12px"
      wrap="nowrap"
      hFilling="fill"
      vFilling="fill"
      alignItems="center"
    >
      <Headbar title="Регистрация" />

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
    </FlexBox>
  )
}

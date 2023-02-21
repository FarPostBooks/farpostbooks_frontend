import { createEffect } from 'solid-js'
import { SignupForm } from '@/features/signup'
import { FlexBox, Headbar, TelegramLoginWidgetData } from '@/shared/ui'

type SignupProps = {
  telegramData: TelegramLoginWidgetData
}
export const Signup = (props: SignupProps) => {
  createEffect(() => console.log(props.telegramData))

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
      <SignupForm telegramData={props.telegramData} />
    </FlexBox>
  )
}

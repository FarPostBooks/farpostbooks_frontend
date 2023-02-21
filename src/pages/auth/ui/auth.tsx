import { FlexBox, Headbar, TelegramLoginWidget } from '@/shared/ui'
import { $$authorization } from '../model'

export const Auth = () => {
  return (
    <FlexBox
      direction="tobottom"
      wrap="nowrap"
      padding="20px"
      gap="40%"
      hFilling="fill"
      vFilling="fill"
    >
      <Headbar title="Библиотека Farpost" />
      <TelegramLoginWidget
        botName="fb_auth_bot"
        buttonSize="large"
        dataOnAuth={$$authorization.onAuthComplete}
      />
    </FlexBox>
  )
}

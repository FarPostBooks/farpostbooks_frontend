import { SignupForm } from '@/features/signup'
import { Headbar } from '@/entities/headbar'
import { FlexBox } from '@/shared/ui'

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
      <SignupForm />
    </FlexBox>
  )
}

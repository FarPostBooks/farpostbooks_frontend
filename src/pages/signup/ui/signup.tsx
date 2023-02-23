import { PageTemplate } from '@/widgets/page-template'
import { SignupForm } from '@/features/signup'
import { Headbar, TelegramLoginWidgetData } from '@/shared/ui'

type SignupProps = {
  telegramData: TelegramLoginWidgetData
}
export const Signup = (props: SignupProps) => {
  return (
    <PageTemplate vFilling="fill">
      <Headbar title="Регистрация" />
      <SignupForm telegramData={props.telegramData} />
    </PageTemplate>
  )
}

import { Show } from 'solid-js'
import { Button, FlexBox, Header } from '@/shared/ui'

export type HeadbarProps = {
  onBack?: () => void
  onLogout?: () => void
  title: string
}

const LogoutButton = (props: Required<Pick<HeadbarProps, 'onLogout'>>) => {
  return (
    <Button
      icon={() => <img src="/Logout.svg" />}
      variant="circled"
      onClick={props.onLogout}
    />
  )
}

const BackButton = (props: Required<Pick<HeadbarProps, 'onBack'>>) => {
  return (
    <Button
      icon={() => <img src="/Arrow.svg" />}
      variant="circled"
      onClick={props.onBack}
    />
  )
}

export const Headbar = (props: HeadbarProps) => {
  return (
    <FlexBox
      direction="toright"
      hFilling="fill"
      vFilling="fit"
      wrap="nowrap"
      gap="10px"
      padding="8px"
      justifyContent="center"
      alignItems="center"
    >
      <Show
        when={props.onBack}
        children={<BackButton onBack={props.onBack as () => void} />}
      />
      <Header variant="h1" text={props.title} />
      <Show
        when={props.onLogout}
        children={<LogoutButton onLogout={props.onLogout as () => void} />}
      />
    </FlexBox>
  )
}

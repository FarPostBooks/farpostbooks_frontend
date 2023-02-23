import { useUnit } from 'effector-solid'
import { createFormControl } from 'solid-forms'
import { createEffect, Show } from 'solid-js'
import { PageTemplate } from '@/widgets/page-template'
import { $$session } from '@/entities/session'
import { Button, Headbar, Input } from '@/shared/ui'

export type MainProps = {
  redirectToProfile: () => void
  redirectToAdmin: () => void
}

export const Main = (props: MainProps) => {
  const hasAdminRules = useUnit($$session.$admin)
  const searchControl = createFormControl('')

  createEffect(() => {
    if (!searchControl.isValid) {
      searchControl.markDirty(true)
    }
  })

  return (
    <PageTemplate>
      <Headbar title="Главное меню" onLogout={$$session.removeToken} />
      <Show when={hasAdminRules()}>
        <Button
          variant="common"
          text="Админ-панель"
          filling="fill"
          onClick={props.redirectToAdmin}
        />
      </Show>

      <Button
        variant="common"
        text="Профиль"
        filling="fill"
        onClick={props.redirectToProfile}
      />
      <Input
        dirty={searchControl.isDirty}
        placeholder="Поиск"
        variant="withIcon"
        icon={<img src="/Search.svg" />}
        filling="fill"
        verticalFilling="fit"
        control={searchControl}
      />
    </PageTemplate>
  )
}

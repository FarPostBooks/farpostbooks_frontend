import { createFormControl, createFormGroup } from 'solid-forms'
import { createEffect } from 'solid-js'
import { Button, Form, Input, TelegramLoginWidgetData } from '@/shared/ui'
import { createUserMutation } from '../model'

const missingValidator = (value: string) =>
  value.length === 0 ? { isMissing: 'Обязательное поле' } : null

const namesFormatValidator = (value: string) =>
  !/(([А-Я]){1}([ЁёА-я])+[-' ]*)+/.test(value)
    ? {
      wrongFormat: 'Неверный формат поля',
    }
    : null

export type SignupFormProps = {
  telegramData: TelegramLoginWidgetData
}

export const SignupForm = (props: SignupFormProps) => {
  const group = createFormGroup({
    name: createFormControl('', {
      required: true,
      validators: [missingValidator, namesFormatValidator],
    }),
    surname: createFormControl('', {
      required: true,
      validators: [missingValidator, namesFormatValidator],
    }),
    position: createFormControl('', {
      required: true,
      validators: missingValidator,
    }),
    about: createFormControl('', {
      required: true,
      validators: missingValidator,
    }),
  })

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    if (!group.isValid) {
      group.markDirty(true)
      return
    }

    createUserMutation.start({
      telegram: props.telegramData,
      user: {
        name: group.value.name ?? '',
        surname: group.value.surname ?? '',
        position: group.value.position ?? '',
        about: group.value.about ?? '',
      },
    })
  }

  createEffect(() => {
    if (group.isValid) {
      group.markDirty(false)
    }
  })

  return (
    <Form vFilling="grow" hFilling="fill" onSubmit={onSubmit}>
      <Input
        dirty={group.isDirty}
        control={group.controls.surname}
        variant="text"
        placeholder="Фамилия"
        filling="fill"
        verticalFilling="fit"
      />
      <Input
        dirty={group.isDirty}
        control={group.controls.name}
        variant="text"
        placeholder="Имя"
        filling="fill"
        verticalFilling="fit"
      />
      <Input
        dirty={group.isDirty}
        control={group.controls.position}
        variant="text"
        placeholder="Должность"
        filling="fill"
        verticalFilling="fit"
      />
      <Input
        dirty={group.isDirty}
        control={group.controls.about}
        variant="textarea"
        placeholder="Предпочтения"
        filling="fill"
        verticalFilling="grow"
      />
      <Button variant="common" text="Зарегестрироваться" filling="fill" />
    </Form>
  )
}

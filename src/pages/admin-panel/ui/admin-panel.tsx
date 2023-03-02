import { useUnit } from 'effector-solid'
import { createFormControl } from 'solid-forms'
import { createEffect } from 'solid-js'
import { PageTemplate } from '@/widgets/page-template'
import { BookPage, checkBookQuery } from '@/entities/book'
import { $$session } from '@/entities/session'
import { IBook } from '@/shared'
import { Button, Form, Headbar, Input, Modal } from '@/shared/ui'
import { $$adminPanel } from '../model'

export type AdminPanelProps = {
  onBack: () => void
}

export const AdminPanel = (props: AdminPanelProps) => {
  const bookPreview = useUnit(checkBookQuery.$data)
  const modalOpened = useUnit($$adminPanel.$modalOpened)
  const bookPending = useUnit(checkBookQuery.$pending)

  const ISBNControl = createFormControl('', {
    validators: [
      (value: string) =>
        !/^([0-9])+$/.test(value)
          ? { wrongFormat: 'Код должен состоять только из цифр' }
          : null,
    ],
  })

  createEffect(() => {
    ISBNControl.setValue(ISBNControl.value.replaceAll('-', ''))
  })

  createEffect(() => {
    if (ISBNControl.isValid) {
      ISBNControl.markDirty(false)
    }
  })

  const submitHandler = (e: SubmitEvent) => {
    e.preventDefault()

    if (!ISBNControl.isValid) {
      ISBNControl.markDirty(true)
      return
    }

    $$adminPanel.checkBook({ isbn: parseInt(ISBNControl.value) })
  }

  return (
    <PageTemplate>
      <Headbar
        onBack={props.onBack}
        onLogout={$$session.removeToken}
        title="Админ-панель"
      />
      <Form onSubmit={submitHandler} vFilling={'fit'} hFilling={'fill'}>
        <Input
          control={ISBNControl}
          dirty={ISBNControl.isDirty}
          placeholder="ISBN"
          variant="text"
          filling="fill"
          verticalFilling="fit"
        />
        <Button text="Добавить" filling="fill" variant="common" />
      </Form>
      <Modal opened={!!bookPreview() && modalOpened() && !bookPending()}>
        <BookPage
          {...(bookPreview() as IBook)}
          onBack={$$adminPanel.closeClicked}
          actionElement={
            <Button
              text="Добавить"
              variant="common"
              filling="fill"
              onClick={() =>
                $$adminPanel.addBook({ isbn: (bookPreview() as IBook).id })
              }
            />
          }
        />
      </Modal>
    </PageTemplate>
  )
}

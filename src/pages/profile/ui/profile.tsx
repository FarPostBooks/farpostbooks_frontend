import { createQueryResource } from '@farfetched/solid'
import { useGate, useUnit } from 'effector-solid'
import { For, Show } from 'solid-js'
import { BookModal } from '@/widgets/book-modal'
import { PageTemplate } from '@/widgets/page-template'
import { $$openBook } from '@/features/open-book'
import { $$profile } from '@/features/profile'
import { $$takeBook } from '@/features/take-book'
import { Card, openBookQuery } from '@/entities/book'
import { getMeQuery } from '@/entities/me'
import { IBook, IBookCompact } from '@/shared'
import { intersect as intersectDirective } from '@/shared/lib'
import { FlexBox, Headbar, Paragraph, Section } from '@/shared/ui'
import { profileGate } from '../model'

const intersect = intersectDirective

declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface Directives {
      intersect: () => void
    }
  }
}

export type ProfileProps = {
  onBack: () => void
  onLogout: () => void
}
export const Profile = (props: ProfileProps) => {
  useGate(profileGate)

  const [me] = createQueryResource(getMeQuery)
  const { books, currentBook, opened } = useUnit({
    books: $$profile.$userBooks,
    currentBook: $$profile.$currentBook,
    opened: $$openBook.$opened,
  })

  const [openedBook] = createQueryResource(openBookQuery)

  return (
    <PageTemplate>
      <Headbar
        title="Профиль"
        onBack={props.onBack}
        onLogout={props.onLogout}
      />
      <Show when={me()}>
        <Section headerVariant="h2" name="Информация:">
          <Section headerVariant="h3" name="Имя:">
            <Paragraph>{me()?.name as string}</Paragraph>
          </Section>
          <Section headerVariant="h3" name="Должность:">
            <Paragraph>{me()?.position as string}</Paragraph>
          </Section>
          <Section headerVariant="h3" name="Предпочтения:">
            <Paragraph>{me()?.about as string}</Paragraph>
          </Section>
        </Section>
      </Show>
      <Show when={currentBook()}>
        <Section headerVariant="h2" name="На руках:">
          <Card
            {...(currentBook()?.book as IBookCompact)}
            taken={currentBook()?.get_timestamp}
            returned={currentBook()?.back_timestamp ?? undefined}
            onClick={() =>
              $$openBook.openBook({ isbn: currentBook()?.book.id as number })
            }
          />
        </Section>
      </Show>
      <Section headerVariant="h2" name="Предыдущие записи:">
        <Show when={books()}>
          <FlexBox
            direction="tobottom"
            wrap="nowrap"
            vFilling="fit"
            hFilling="fill"
            gap="20px"
            padding="0"
            alignItems="center"
          >
            <For each={books()}>
              {(book) => (
                <Card
                  {...book.book}
                  taken={book.get_timestamp}
                  returned={book.back_timestamp ?? undefined}
                  onClick={() => {
                    $$openBook.openBook({ isbn: book.book.id })
                  }}
                />
              )}
            </For>
            <div use:intersect={$$profile.load} />
          </FlexBox>
        </Show>
      </Section>

      <BookModal
        bookOpened={opened()}
        closeBook={$$openBook.closeBook}
        currentBook={openedBook() as IBook}
        currentUserBook={currentBook()?.book.id as number}
        takeBook={() =>
          $$takeBook.takeBook({ isbn: openedBook()?.id as number })
        }
        returnBook={$$takeBook.returnBook}
      />
    </PageTemplate>
  )
}

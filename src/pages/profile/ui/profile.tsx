import { createQueryResource } from '@farfetched/solid'
import { useUnit } from 'effector-solid'
import { For, Show } from 'solid-js'
import { PageTemplate } from '@/widgets/page-template'
import { $$profile } from '@/features/profile'
import { Card } from '@/entities/book'
import { getMeQuery } from '@/entities/me'
import { IBookCompact } from '@/shared'
import { intersect as intersectDirective } from '@/shared/lib'
import { FlexBox, Headbar, Paragraph, Section } from '@/shared/ui'

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
  const [me] = createQueryResource(getMeQuery)
  const { books, currentBook } = useUnit({
    books: $$profile.$userBooks,
    currentBook: $$profile.$currentBook,
  })

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
            onClick={() => console.log('')}
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
                    console.log('')
                  }}
                />
              )}
            </For>
            <div use:intersect={$$profile.load} />
          </FlexBox>
        </Show>
      </Section>
    </PageTemplate>
  )
}

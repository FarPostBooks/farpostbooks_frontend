import { For } from 'solid-js'
import { ITakesHistory } from '@/shared'
import { toLocaleDateTime } from '@/shared/lib'
import { Header, Paragraph } from '@/shared/ui'
import s from './s.module.sass'
export type TakesHistoryProps = {
  books: ITakesHistory
}

export const TakesHistory = (props: TakesHistoryProps) => {
  return (
    <table classList={{ [s.takesHistory]: true }}>
      <tbody>
        <tr>
          <td>
            <Header text="Имя" variant="h4" />
          </td>
          <td>
            <Header text="Взята" variant="h4" />
          </td>
          <td>
            <Header text="Возвращена" variant="h4" />
          </td>
        </tr>

        <For each={props.books}>
          {(take) => (
            <tr style={{ 'text-align': 'center', 'vertical-align': 'top' }}>
              <td>
                <Paragraph>{take.user.name}</Paragraph>
              </td>
              <td>
                <Paragraph>{toLocaleDateTime(take.get_timestamp)}</Paragraph>
              </td>
              <td>
                <Paragraph>
                  {take.back_timestamp
                    ? toLocaleDateTime(take.back_timestamp)
                    : ''}
                </Paragraph>
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  )
}

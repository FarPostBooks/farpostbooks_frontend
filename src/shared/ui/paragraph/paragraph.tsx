import { children } from 'solid-js'
import s from './s.module.sass'

export type ParagraphProps = {
  children: string
}

export const Paragraph = (props: ParagraphProps) => {
  const c = children(() => props.children)

  return <p classList={{ [s.paragraph]: true }}>{c()}</p>
}

import { splitProps } from 'solid-js'
import s from './s.module.sass'

export type ImageProps = {
  src: string
  alt: string
  variant: 'compact' | 'filling'
}

export const Image = (props: ImageProps) => {
  const [local, attrs] = splitProps(props, ['variant'])
  return (
    <img
      classList={{
        [s[local.variant]]: true,
      }}
      loading="lazy"
      {...attrs}
    />
  )
}

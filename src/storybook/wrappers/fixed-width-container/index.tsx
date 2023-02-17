import { children, JSX } from 'solid-js'

type FixedWidthContainerProps = {
  children: JSX.Element
  width: number
}
export const FixedWidthContainer = (props: FixedWidthContainerProps) => {
  const c = children(() => props.children)

  return <div style={{ width: `${props.width}px` }}>{c()}</div>
}

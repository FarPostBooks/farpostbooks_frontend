import { createMemo, onMount } from 'solid-js'

export const intersect = (el: Element, accessor: () => () => void) => {
  const observer = createMemo(
    () =>
      new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          accessor()()
        }
      })
  )

  onMount(() => {
    observer().observe(el)
  })
}

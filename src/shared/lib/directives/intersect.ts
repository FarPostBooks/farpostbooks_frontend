import { createMemo, onMount } from 'solid-js'

export const intersect = (el: Element, accessor: () => () => void) => {
  const observer = createMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            accessor()()
          }
        },
        { rootMargin: `${window.innerHeight / 2}px` }
      )
  )

  onMount(() => {
    observer().observe(el)
  })
}

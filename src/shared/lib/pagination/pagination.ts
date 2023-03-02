import { createEvent, createStore, sample, Event } from 'effector'

export const createPaginationControls = ({
  limit,
  updateParamsClock,
  loadAction,
}: {
  limit?: number
  updateParamsClock: Event<null>
  loadAction: Event<{ offset: number; limit: number }>
}) => {
  const $offset = createStore(0)
  const $limit = createStore(limit ?? 10)

  const reload = createEvent()
  const load = createEvent()

  const willLoad = sample({
    clock: load,
    source: { offset: $offset, limit: $limit },
  })

  $offset.reset(reload)

  sample({
    clock: updateParamsClock,
    source: { offset: $offset, limit: $limit },
    fn: ({ offset, limit }) => offset + limit,
    target: $offset,
  })

  sample({
    clock: willLoad,
    target: loadAction,
  })

  return { load, reload }
}

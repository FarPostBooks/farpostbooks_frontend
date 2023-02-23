import { createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-solid'

const readLocalStorageItem = <T>(name: string) => {
  const value = localStorage.getItem(name)
  if (!value || value === 'undefined') return null

  return JSON.parse(value) as T
}

const writeLocalStorageItem = <T>({
  name,
  value,
}: {
  name: string
  value: T
}) => {
  const json = JSON.stringify(value)
  localStorage.setItem(name, json)
}

const removeLocalStorageItem = (name: string) => {
  localStorage.removeItem(name)
}

export const createLocalStorageItem = <T>(name: string) => {
  const gate = createGate()

  const $value = createStore<T | null>(readLocalStorageItem<T>(name))
  const update = createEvent<T>()
  const remove = createEvent()

  const setupCompleted = sample({
    clock: gate.open,
    source: $value,
  })

  const $ready = createStore(false)
  sample({
    clock: gate.open,
    fn: () => true,
    target: $ready,
  })

  sample({
    clock: update,
    target: $value,
  })

  const willWrite = sample({
    clock: update,
    fn: (value: T) => ({ name, value }),
  })

  sample({
    clock: willWrite,
    fn: (pare) => writeLocalStorageItem<T>(pare),
  })

  sample({
    clock: remove,
    fn: () => removeLocalStorageItem(name),
  })

  sample({
    clock: remove,
    fn: () => null,
    target: $value,
  })

  return { $value, $ready, update, remove, setupCompleted, gate }
}

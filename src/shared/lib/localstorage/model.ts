import { createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-solid'

const readLocalStorageItem = <T>(name: string) => {
  const value = localStorage.getItem(name)
  if (!value) return null

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

export const createLocalStorageItem = <T>(name: string) => {
  const gate = createGate()

  const $value = createStore<T | null>(readLocalStorageItem<T>(name))
  const update = createEvent<T>()

  const willRead = sample({
    clock: gate.open,
    fn: () => name,
  })

  sample({
    clock: willRead,
    fn: (name: string) => readLocalStorageItem<T>(name),
    target: $value,
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

  return { $value, update, gate }
}

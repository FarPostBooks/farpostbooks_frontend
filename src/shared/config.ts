export const config = {
  base: import.meta.env.VITE_FARPOSTBOOKS_BACKEND_URL,
}

export const combineUrl = (route: string) => `${config.base}api/${route}`
export const combineStatic = (resource: string) =>
  `${config.base}images/${resource}`

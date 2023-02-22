export const config = {
  base: 'http://localhost:8000/',
}

export const combineUrl = (route: string) => `${config.base}api/${route}`
export const combineStatic = (resource: string) =>
  `${config.base}images/${resource}`

export const config = {
  base: import.meta.env.VITE_FARPOSTBOOKS_BACKEND_URL,
  botName: import.meta.env.VITE_FARPOSTBOOKS_BOT_NAME,
}

export const combineUrl = (route: string) => `${config.base}api/${route}`
export const combineStatic = (resource: string) =>
  `${config.base}images/${resource}`

export const getBotName = () => `${config.botName}`

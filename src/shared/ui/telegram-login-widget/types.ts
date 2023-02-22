export type TelegramLoginWidgetProps = {
  botName: string
  buttonSize: 'small' | 'medium' | 'large'
  borderRadius?: number
  dataOnAuth: (data: TelegramLoginWidgetData) => void
}

export type TelegramLoginWidgetData = {
  auth_date: number
  first_name?: string
  hash: string
  id: number
  last_name?: string
  photo_url?: string
  username?: string
}

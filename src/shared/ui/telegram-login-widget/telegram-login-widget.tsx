import { onMount } from 'solid-js'
import { TelegramLoginWidgetData, TelegramLoginWidgetProps } from './types'

export const TelegramLoginWidget = (props: TelegramLoginWidgetProps) => {
  let widget: HTMLDivElement
  const render = () => <div ref={widget} style={{ 'align-self': 'center' }} />

  onMount(() => {
    window.TelegramLoginWidget = {
      dataOnAuth: (data: TelegramLoginWidgetData) => props.dataOnAuth(data),
    }

    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?21'
    script.setAttribute('data-telegram-login', props.botName)
    script.setAttribute('data-size', props.buttonSize)

    if (props.borderRadius !== undefined) {
      script.setAttribute('data-radius', `${props.borderRadius}`)
    }
    script.setAttribute('data-request-access', 'write')
    script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnAuth(user)')
    script.async = true
    widget.appendChild(script)
  })

  return render()
}

TelegramLoginWidget.defaultProps = {
  buttonSize: 'medium',
}

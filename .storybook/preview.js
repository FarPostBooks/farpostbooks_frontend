import { render } from 'solid-js/web'
import './index.css'
import '../src/app/styles/index.sass'

let disposeStory

export const decorators = [
  (Story) => {
    disposeStory?.()
    const solidRoot = document.createElement('div')
    disposeStory = render(Story, solidRoot)
    return solidRoot
  },
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

import { RouterProvider } from 'atomic-router-solid'
import { render } from 'solid-js/web'
import { App } from './app'
import { router } from './routing'
import '@/processes/authorization'

render(
  () => (
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  ),
  document.getElementById('root') as HTMLElement
)

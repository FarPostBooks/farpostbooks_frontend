import { RouterProvider } from 'atomic-router-solid'
import { render } from 'solid-js/web'
import { App } from './app'
import { router } from './routing'
import '@/processes/book-borrowing'
import '@/processes/redirecting'
import '@/processes/book-modals'
import '@/processes/unauthorization'
import '@/processes/state-synchronization'

render(
  () => (
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  ),
  document.getElementById('root') as HTMLElement
)

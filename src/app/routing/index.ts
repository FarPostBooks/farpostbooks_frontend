import { createHistoryRouter } from 'atomic-router'
import { createBrowserHistory } from 'history'
import { adminRoute } from '@/pages/admin-panel'
import { authRoute } from '@/pages/auth'
import { mainRoute } from '@/pages/main'
import { profileRoute } from '@/pages/profile'
import { signupRoute } from '@/pages/signup'

const routes = [
  { path: '/', route: mainRoute },
  { path: '/auth', route: authRoute },
  { path: '/signup', route: signupRoute },
  { path: '/admin', route: adminRoute },
  { path: '/profile', route: profileRoute },
]

export const router = createHistoryRouter({
  routes,
})

const history = createBrowserHistory()

router.setHistory(history)

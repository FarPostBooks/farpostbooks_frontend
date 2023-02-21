import { Route } from 'atomic-router-solid'
import { useUnit } from 'effector-solid'
import './styles/index.sass'
import { redirectToAuthorization } from '@/processes/authorization'
import { $$authorization, authRoute } from '@/pages/auth'
import { Auth } from '@/pages/auth'
import { Main, mainRoute } from '@/pages/main'
import { Signup, signupRoute } from '@/pages/signup'
import { Protected } from '@/shared/lib'
import { TelegramLoginWidgetData } from '@/shared/ui'

export const App = () => {
  const telegramData = useUnit($$authorization.$authorizationData)

  return (
    <>
      <Route route={mainRoute} view={() => <Main />} />
      <Route route={authRoute} view={() => <Auth />} />
      <Route
        route={signupRoute}
        view={() => (
          <Protected
            checking={false}
            hasAccess={!!telegramData()}
            redirect={redirectToAuthorization}
          >
            <Signup telegramData={telegramData() as TelegramLoginWidgetData} />
          </Protected>
        )}
      />
    </>
  )
}

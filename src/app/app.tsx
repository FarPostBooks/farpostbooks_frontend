import { Route } from 'atomic-router-solid'
import { useGate, useStoreMap, useUnit } from 'effector-solid'
import './styles/index.sass'
import { createEffect } from 'solid-js'
import {
  redirectToAdmin,
  redirectToAuthorization,
  redirectToMain,
  redirectToProfile,
} from '@/processes/redirecting'
import { AdminPanel, adminRoute } from '@/pages/admin-panel'
import { $$authorization, authRoute } from '@/pages/auth'
import { Auth } from '@/pages/auth'
import { Main, mainRoute } from '@/pages/main'
import { Signup, signupRoute } from '@/pages/signup'
import { getMeQuery } from '@/entities/me/query'
import { $$session } from '@/entities/session'
import { Protected } from '@/shared/lib'
import { TelegramLoginWidgetData } from '@/shared/ui'

export const App = () => {
  useGate($$session.TokenGate)
  useGate($$authorization.AuthorizationGate)

  const telegramData = useUnit($$authorization.$authorizationData)
  const authChecking = useUnit(getMeQuery.$pending)
  const authPassed = useUnit(getMeQuery.$succeeded)
  const hasAdminRights = useUnit($$session.$admin)

  return (
    <>
      <Route
        route={mainRoute}
        view={() => (
          <Protected
            checking={authChecking()}
            redirect={redirectToAuthorization}
            hasAccess={authPassed()}
          >
            <Main
              redirectToAdmin={redirectToAdmin}
              redirectToProfile={redirectToProfile}
            />
          </Protected>
        )}
      />
      <Route
        route={authRoute}
        view={() => (
          <Protected
            checking={authChecking()}
            redirect={redirectToMain}
            hasAccess={!authPassed()}
          >
            <Auth />
          </Protected>
        )}
      />
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

      <Route
        route={adminRoute}
        view={() => {
          console.log('checking and passed', authChecking(), authPassed())

          return (
            <Protected
              checking={authChecking()}
              hasAccess={authPassed()}
              redirect={redirectToAuthorization}
            >
              <AdminPanel onBack={redirectToMain} />
            </Protected>
          )
        }}
      />
    </>
  )
}

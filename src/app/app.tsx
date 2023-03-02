import { Route } from 'atomic-router-solid'
import { useGate, useUnit } from 'effector-solid'
import './styles/index.sass'
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
import { Profile, profileRoute } from '@/pages/profile'
import { Signup, signupRoute } from '@/pages/signup'
import { NotificationManager } from '@/widgets/notification-manager'
import { $$session } from '@/entities/session'
import { Protected } from '@/shared/lib'
import { TelegramLoginWidgetData } from '@/shared/ui'

export const App = () => {
  useGate($$session.TokenGate)
  const telegramData = useUnit($$authorization.$authorizationData)
  const ready = useUnit($$session.$tokenReady)
  const authPassed = useUnit($$session.$token)
  const admin = useUnit($$session.$admin)

  return (
    <>
      <Route
        route={mainRoute}
        view={() => (
          <Protected
            checking={!ready()}
            redirect={redirectToAuthorization}
            hasAccess={!!authPassed()}
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
            // checking={authChecking()}
            checking={!ready()}
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
        route={profileRoute}
        view={() => (
          <Protected
            checking={!ready}
            hasAccess={!!authPassed()}
            redirect={redirectToAuthorization}
          >
            <Profile onBack={redirectToMain} onLogout={$$session.removeToken} />
          </Protected>
        )}
      />
      <Route
        route={adminRoute}
        view={() => {
          return (
            <Protected
              checking={!ready()}
              hasAccess={!!authPassed() && admin()}
              redirect={redirectToAuthorization}
            >
              <AdminPanel onBack={redirectToMain} />
            </Protected>
          )
        }}
      />
      <NotificationManager />
    </>
  )
}

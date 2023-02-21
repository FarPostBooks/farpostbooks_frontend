import { redirect } from 'atomic-router'
import { createEvent } from 'effector'
import { $$authorization, authRoute } from '@/pages/auth'
import { signupRoute } from '@/pages/signup'

export const redirectToAuthorization = createEvent()

redirect({ clock: $$authorization.onAuthComplete, route: signupRoute })
redirect({ clock: redirectToAuthorization, route: authRoute })

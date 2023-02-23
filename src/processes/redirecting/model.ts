import { redirect } from 'atomic-router'
import { createEvent } from 'effector'
import { adminRoute } from '@/pages/admin-panel'
import { $$authorization, authRoute } from '@/pages/auth'
import { mainRoute } from '@/pages/main'
import { signupRoute } from '@/pages/signup'
import { createUserMutation } from '@/features/signup'

export const redirectToAuthorization = createEvent()
export const redirectToMain = createEvent()

redirect({ clock: redirectToMain, route: mainRoute })
redirect({ clock: createUserMutation.finished.success, route: mainRoute })
redirect({ clock: $$authorization.redirectToSignup, route: signupRoute })
redirect({ clock: redirectToAuthorization, route: authRoute })

export const redirectToAdmin = createEvent()
redirect({ clock: redirectToAdmin, route: adminRoute })

export const redirectToProfile = createEvent()
// redirect({clock: redirectToProfile, route: })

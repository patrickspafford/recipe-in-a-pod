import { ReactNode } from 'react'
import { withConditionalRedirect } from '../../components'
import { useIsAuthenticated } from '../../providers/Auth'

const withoutAuth = (WrappedComponent: ReactNode, location = '/') => (
  withConditionalRedirect({
    WrappedComponent,
    location,
    clientCondition: () => useIsAuthenticated(),
    serverCondition: (ctx: any) => !!ctx.req?.cookies.session,
  })
)

export default withoutAuth

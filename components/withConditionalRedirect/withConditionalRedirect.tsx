import { useRouter } from 'next/router'

const isBrowser = () => typeof window !== 'undefined'

const withConditionalRedirect = ({
  WrappedComponent,
  clientCondition,
  serverCondition,
  location,
}) => {
  const WithConditionalRedirectWrapper = (props: any) => {
    const router = useRouter()
    const redirectCondition = clientCondition()
    if (isBrowser() && redirectCondition) {
      router.push(location)
      return <></>
    }
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} />
  }
  WithConditionalRedirectWrapper.getInitialProps = async (ctx: any) => {
    if (!isBrowser() && ctx.res) {
      if (serverCondition(ctx)) {
        ctx.res.writeHead(302, { Location: location })
        ctx.res.end()
      }
    }
    const componentProps = WrappedComponent.getInitialProps
    && (await WrappedComponent.getInitialProps(ctx))
    return { ...componentProps }
  }

  return WithConditionalRedirectWrapper
}

export default withConditionalRedirect

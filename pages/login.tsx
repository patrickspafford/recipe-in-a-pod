import { LoginForm, Layout, FormLayout, FormExtra } from '../components'
import useWindowSize from '../hooks/useWindowSize'

const LoginPage = () => {
  const { isLarge } = useWindowSize()
  return (
    <Layout title="Log In">
      <FormLayout>
        <div style={{ paddingTop: isLarge ? '5rem' : '1rem' }}>
          <LoginForm />
          <FormExtra buttonText="Sign up" href="/signup">
            Don&apos;t have an account?
          </FormExtra>
          <FormExtra buttonText="reset" href="/forgot">
            Forgot password?
          </FormExtra>
        </div>
      </FormLayout>
    </Layout>
  )
}

export default LoginPage

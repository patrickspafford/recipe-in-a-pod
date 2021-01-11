import {
  LoginForm, Layout, FormLayout, FormExtra,
} from '../components'

const LoginPage = () => (
  <Layout title="Log In" hideLogInOut>
    <FormLayout>
      <LoginForm />
      <FormExtra buttonText="Sign up" href="/signup">
        Don&apos;t have an account?
      </FormExtra>
      <FormExtra buttonText="reset" href="/forgot">
        Forgot password?
      </FormExtra>
    </FormLayout>
  </Layout>
)

export default LoginPage

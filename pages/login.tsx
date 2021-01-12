import {
  LoginForm, Layout, FormLayout, FormExtra,
} from '../components'

const LoginPage = () => (
  <Layout title="Log In">
    <FormLayout>
      <div style={{ paddingTop: '5rem' }}>
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

export default LoginPage

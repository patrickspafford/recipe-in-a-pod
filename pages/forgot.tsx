import { useState, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import {
  SnackBar, Layout, FormLayout, EmailField, SubmitButton,
} from '../components'
import { useAuth } from '../hooks/useAuth'
import { emailPattern } from '../utils/regex'

interface ForgotData {
    email: string
}

const ForgotPage = () => {
  const [email, setEmail] = useState<string>('')
  const [hasEditedEmail, setHasEditedEmail] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<string>('')
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState<string>('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<string>('error')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)

  const { handleSubmit, register } = useForm()
  const auth = useAuth()

  const onSubmit = async (data: ForgotData) => {
    if (await auth.sendForgotPasswordEmail(data)) {
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      setEmail('')
      setForgotPasswordMessage('Email sent successfully! Your recipes await.')
    } else {
      setSnackbarSeverity('error')
      setForgotPasswordMessage('Something went wrong. Please check that your email is correct.')
      setSnackbarOpen(true)
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const currentEmailValue = e.target.value
    setEmail(currentEmailValue)
    if (!hasEditedEmail) setHasEditedEmail(true)
    if (currentEmailValue.length === 0 && hasEditedEmail) {
      setEmailError('Please enter an email address.')
    } else if (!currentEmailValue.match(emailPattern)) {
      setEmailError('Please enter a valid email address.')
    } else if (currentEmailValue.length > 128) {
      setEmailError('Email address must not exceed 128 characters.')
    } else setEmailError('')
  }

  const disableSubmit = emailError.length > 0 || !hasEditedEmail

  return (
    <Layout title="Forgot Password" hideLogInOut>
      <FormLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <EmailField
            id="email"
            inputRef={register({
              required: true,
            })}
            value={email}
            error={emailError}
            onChange={(e) => handleEmailChange(e)}
          />
          <SubmitButton
            disabled={disableSubmit}
          >
            Send Email
          </SubmitButton>
        </form>
        <SnackBar
          open={snackbarOpen}
          setOpen={(bool: boolean) => setSnackbarOpen(bool)}
          message={forgotPasswordMessage}
          severity={snackbarSeverity}
        />
      </FormLayout>
    </Layout>
  )
}

export default ForgotPage

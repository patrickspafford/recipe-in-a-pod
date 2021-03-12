import { useState, ChangeEvent, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import {
  SnackBar,
  EmailField,
  PasswordField,
  SubmitButton,
} from '../../components'
import { emailPattern } from '../../utils/regex'
import { PseudoEvent, FirebaseError } from '../../types'
import { ApiContext } from '../../contexts/apiContext'
import LoadingIndicator from '../LoadingIndicator'

interface LoginData {
  email: string
  currentPassword: string
}

const LoginForm = () => {
  const { apiService } = useContext(ApiContext)
  // Form field values
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  // Loading
  const [loading, setLoading] = useState<boolean>(false)
  // Validation errors
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  // Error after submit
  const [loginError, setLoginError] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  // Other state
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [hasEditedEmail, setHasEditedEmail] = useState<boolean>(false)
  const [hasEditedPassword, setHasEditedPassword] = useState<boolean>(false)

  const { handleSubmit, register } = useForm()
  const router = useRouter()

  const handlePasswordChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | PseudoEvent,
    ignoreHasEditedPassword?: boolean,
  ) => {
    const currentPasswordValue = e.target.value
    setPassword(currentPasswordValue)
    if (!hasEditedPassword) setHasEditedPassword(true)
    if (
      currentPasswordValue.length === 0 &&
      hasEditedPassword &&
      !ignoreHasEditedPassword
    ) {
      setPasswordError('Please enter a password.')
    } else if (
      currentPasswordValue.length < 6 &&
      hasEditedPassword &&
      !ignoreHasEditedPassword
    ) {
      setPasswordError('Password must be at least 6 characters.')
    } else if (currentPasswordValue.length > 128) {
      setPasswordError('Password must not exceed 128 characters.')
    } else if (currentPasswordValue.length === 1) {
      setPasswordError('Password must be at least 6 characters.')
    } else setPasswordError('')
  }

  const handleEmailChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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

  const onSubmit = (data: LoginData) => {
    setHasEditedEmail(true)
    setHasEditedPassword(true)
    setLoading(true)
    return apiService
      .signIn(data)
      .then((msg) => {
        setLoginError('')
        router
          .push('/')
          .then(() => console.log(msg))
          .catch((e) => {
            setLoading(false)
            console.error(e)
          })
      })
      .catch((err: FirebaseError) => {
        setLoading(false)
        console.log(err)
        if (err.code && err.code.includes('wrong-password')) {
          setLoginError('Incorrect password.')
        } else if (err.code.includes('too-many-requests')) {
          setLoginError(
            'Too many failed attempts. Account temporarily disabled.',
          )
        } else {
          setLoginError(
            'Something went wrong. Please check that the email you entered is correct.',
          )
        }
        const pseudoEvent = {
          target: {
            value: '',
          },
        }
        const ignoreHasEditedPassword = true
        handlePasswordChange(pseudoEvent, ignoreHasEditedPassword)
        setSnackbarOpen(true)
      })
  }

  const disableSubmit =
    emailError.length > 0 ||
    passwordError.length > 0 ||
    !hasEditedEmail ||
    !hasEditedPassword ||
    password.length < 6

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailField
          id="email"
          name="email"
          value={email}
          error={emailError}
          onChange={(e) => handleEmailChange(e)}
          inputRef={register({
            required: true,
          })}
        />
        <PasswordField
          id="currentPassword"
          showPassword={showPassword}
          value={password}
          inputRef={register({
            required: true,
          })}
          error={passwordError}
          onChange={(e) => handlePasswordChange(e)}
          setShowPassword={() => setShowPassword(!showPassword)}
        />
        <SubmitButton disabled={disableSubmit}>
          {loading ? <LoadingIndicator /> : 'Log In'}
        </SubmitButton>
      </form>
      <SnackBar
        open={snackbarOpen}
        setOpen={(bool: boolean) => setSnackbarOpen(bool)}
        message={loginError}
        severity="error"
      />
    </>
  )
}

export default LoginForm

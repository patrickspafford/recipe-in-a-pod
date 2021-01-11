import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import {
  EmailField, PasswordField, UsernameField, SubmitButton, SnackBar, LoadingIndicator,
} from '../../components'
import { useAuth } from '../../hooks/useAuth'
import { TextFieldChange, PseudoEvent } from '../../types'
import { emailPattern, usernamePattern } from '../../utils/regex'

interface SignUpData {
    name: string
    email: string
    currentPassword: string
}

const SignUpForm = () => {
  const { register, handleSubmit } = useForm()
  const auth = useAuth()
  const router = useRouter()

  // Form field values
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  // Validation errors
  const [usernameError, setUsernameError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')
  // Progress
  const [loading, setLoading] = useState<boolean>(false)
  // Error after submit
  const [signUpError, setSignUpError] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  // Other state
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [hasEditedEmail, setHasEditedEmail] = useState<boolean>(false)
  const [hasEditedPassword, setHasEditedPassword] = useState<boolean>(false)
  const [hasEditedConfirmPassword, setHasEditedConfirmPassword] = useState<boolean>(false)
  const [hasEditedUsername, setHasEditedUsername] = useState<boolean>(false)

  const handleUsernameChange = (e: TextFieldChange) => {
    const currentUsernameValue = e.target.value
    setUsername(currentUsernameValue)
    if (!hasEditedUsername) setHasEditedUsername(true)
    if (currentUsernameValue.length === 0 && hasEditedPassword) {
      setUsernameError('Please enter a username.')
    } else if (currentUsernameValue.length > 64) {
      setUsernameError('Username cannot exceed 64 characters.')
    } else if (!currentUsernameValue.match(usernamePattern)) {
      setUsernameError('Username not valid.')
    } else setUsernameError('')
  }

  const handlePasswordChange = (e: TextFieldChange| PseudoEvent,
    ignoreHasEditedPassword?: boolean) => {
    const currentPasswordValue = e.target.value
    setPassword(currentPasswordValue)
    if (!hasEditedPassword) setHasEditedPassword(true)
    if (currentPasswordValue.length === 0 && hasEditedPassword && !ignoreHasEditedPassword) {
      setPasswordError('Please enter a password.')
    } else if (currentPasswordValue.length < 6 && hasEditedPassword && !ignoreHasEditedPassword) {
      setPasswordError('Password must be at least 6 characters.')
    } else if (currentPasswordValue.length > 128) {
      setPasswordError('Password must not exceed 128 characters.')
    } else if (currentPasswordValue.length === 1) {
      setPasswordError('Password must be at least 6 characters.')
    } else setPasswordError('')

    if (currentPasswordValue !== confirmPassword && hasEditedConfirmPassword) {
      setConfirmPasswordError('Passwords did not match.')
    } else {
      setConfirmPasswordError('')
    }
  }

  const handleConfirmPasswordChange = (e: TextFieldChange | PseudoEvent,
    ignoreHasEditedConfirmPassword?: boolean) => {
    const currentConfirmPasswordValue = e.target.value
    setConfirmPassword(currentConfirmPasswordValue)
    if (!hasEditedConfirmPassword) setHasEditedConfirmPassword(true)
    if (currentConfirmPasswordValue !== password && !ignoreHasEditedConfirmPassword) {
      setConfirmPasswordError('Passwords did not match.')
    } else setConfirmPasswordError('')
  }

  const handleEmailChange = (e: TextFieldChange) => {
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

  const onSubmit = (data: SignUpData) => {
    setLoading(true)
    auth.signUp(data)
      .then(() => router.push('/'))
      .catch((err: Error) => {
        setLoading(false)
        const pseudoEvent: PseudoEvent = {
          target: {
            value: '',
          },
        }
        handlePasswordChange(pseudoEvent, true)
        handleConfirmPasswordChange(pseudoEvent, true)
        console.error(err)
        if (err.message.includes('Username')) {
          setSignUpError(`That name (${username}) is already taken.`)
          setUsernameError('Username must be unique.')
        } else if (err.message.includes('email')) {
          setSignUpError('An account with this email already exists.')
        } else setSignUpError('Something went wrong. Please check that your information is correct.')
        setSnackbarOpen(true)
      })
  }

  const disabledSubmit: boolean = [
    emailError,
    passwordError,
    confirmPasswordError,
    usernameError,
  ].some((errorMessage: string) => errorMessage.length > 0)
  || [
    email,
    password,
    confirmPassword,
    username].some((field: string) => field.length === 0)
    || [
      hasEditedEmail,
      hasEditedPassword,
      hasEditedConfirmPassword,
      hasEditedUsername,
    ].some((check: boolean) => !check)

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <UsernameField
          id="username"
          value={username}
          inputRef={register({ required: true })}
          onChange={(e: TextFieldChange) => handleUsernameChange(e)}
          error={usernameError}
          name="name"
          label="Username"
        />
        <EmailField
          id="email"
          value={email}
          inputRef={register({ required: true })}
          error={emailError}
          onChange={(e: TextFieldChange) => handleEmailChange(e)}
        />
        <PasswordField
          id="new-password"
          value={password}
          inputRef={register({ required: true })}
          onChange={(e: TextFieldChange) => handlePasswordChange(e)}
          error={passwordError}
          name="currentPassword"
          label="New Password"
          showPassword={showPassword}
          setShowPassword={() => setShowPassword(!showPassword)}
        />
        <PasswordField
          id="confirm-new-password"
          value={confirmPassword}
          onChange={(e: TextFieldChange) => handleConfirmPasswordChange(e)}
          error={confirmPasswordError}
          name="confirmCurrentPassword"
          label="Confirm New Password"
          showPassword={showConfirmPassword}
          setShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />
        <SubmitButton
          disabled={disabledSubmit}
        >
          {loading ? <LoadingIndicator /> : 'Sign up'}
        </SubmitButton>
      </form>
      <SnackBar
        open={snackbarOpen}
        setOpen={(bool: boolean) => setSnackbarOpen(bool)}
        message={signUpError}
        severity="error"
      />
    </>
  )
}

export default SignUpForm

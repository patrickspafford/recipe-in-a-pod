import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import {
  SnackBar,
  EmailField,
  PasswordField,
  UsernameField,
  SubmitButton,
  Switch,
} from '../../components'
import { FaceIcon, EmailIcon } from '../../icons'
import { emailPattern, usernamePattern } from '../../utils/regex'
import { PseudoEvent, FirebaseError, TextFieldChange } from '../../types'
import { ApiContext } from '../../contexts/apiContext'
import LoadingIndicator from '../LoadingIndicator'

interface FormValues {
  email: string
  password: string
  username: string
}

interface FormErrors {
  email: string
  password: string
  username: string
}

interface HasEdited {
  email: boolean
  password: boolean
  username: boolean
}

interface SnackbarState {
  open: boolean
  message: string
}

const LoginForm = () => {
  const { apiService } = useContext(ApiContext)
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    username: '',
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: '',
    password: '',
    username: '',
  })
  const [hasEdited, setHasEdited] = useState<HasEdited>({
    email: false,
    password: false,
    username: false,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [isUsernameLogin, setIsUsernameLogin] = useState<boolean>(true)
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    message: '',
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()

  const updateFormValue = (key: string, value: string) => {
    setFormValues({
      ...formValues,
      [key]: value,
    })
  }

  const updateFormError = (key: string, value: string) => {
    setFormErrors({
      ...formErrors,
      [key]: value,
    })
  }

  const updateHasEdited = (key: string, value: boolean) => {
    setHasEdited({
      ...hasEdited,
      [key]: value,
    })
  }

  const handlePasswordChange = (
    e: TextFieldChange | PseudoEvent,
    ignoreHasEditedPassword?: boolean,
  ) => {
    const currentPasswordValue = e.target.value
    const updateError = (value: string) => updateFormError('password', value)
    updateFormValue('password', currentPasswordValue)
    if (!hasEdited.password) updateHasEdited('password', true)
    if (
      currentPasswordValue.length === 0 &&
      hasEdited.password &&
      !ignoreHasEditedPassword
    ) {
      updateError('Please enter a password.')
    } else if (
      currentPasswordValue.length < 6 &&
      hasEdited.password &&
      !ignoreHasEditedPassword
    ) {
      updateError('Password must be at least 6 characters.')
    } else if (currentPasswordValue.length > 128) {
      updateError('Password must not exceed 128 characters.')
    } else if (currentPasswordValue.length === 1) {
      updateError('Password must be at least 6 characters.')
    } else {
      updateError('')
    }
  }

  const handleEmailChange = (e: TextFieldChange) => {
    const currentEmailValue = e.target.value
    updateFormValue('email', currentEmailValue)
    const updateError = (value: string) => updateFormError('email', value)
    if (!hasEdited.email) updateHasEdited('email', true)
    if (currentEmailValue.length === 0 && hasEdited.email) {
      updateError('Please enter an email address.')
    } else if (!currentEmailValue.match(emailPattern)) {
      updateError('Please enter a valid email address.')
    } else if (currentEmailValue.length > 128) {
      updateError('Email address must not exceed 128 characters.')
    } else {
      updateError('')
    }
  }

  const handleUsernameChange = (e: TextFieldChange) => {
    const currentUsernameValue = e.target.value
    const updateError = (val: string) => updateFormError('username', val)
    setFormValues({ ...formValues, username: currentUsernameValue })
    if (!hasEdited.username) {
      setHasEdited({ ...hasEdited, username: true })
    }
    if (currentUsernameValue.length === 0 && hasEdited.password) {
      updateError('Please enter a username')
    } else if (currentUsernameValue.length > 64) {
      updateError('Username cannot exceed 64 characters.')
    } else if (!currentUsernameValue.match(usernamePattern)) {
      updateError('Username not valid.')
    } else updateError('')
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      setHasEdited({
        ...hasEdited,
        email: true,
        password: true,
      })
      setLoading(true)
      await apiService.signIn({
        email: formValues.email,
        currentPassword: formValues.password,
      })
      await router.push('/')
    } catch (submitErr) {
      const err = submitErr as FirebaseError
      setLoading(false)
      const updateError = (val: string) => {
        setSnackbarState({
          open: true,
          message: val,
        })
      }
      if (err.code && err.code.includes('wrong-password')) {
        updateError('Incorrect password.')
      } else if (err.code.includes('too-many-requests')) {
        updateError('Too many failed attempts. Account temporarily disabled.')
      } else {
        updateError(
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
    }
  }

  const disableSubmit = isUsernameLogin
    ? Object.values(formValues).some((val) => val.length === 0) ||
      Object.values(formErrors).some((val) => val.length > 0) ||
      Object.values(hasEdited).some((edited) => !edited)
    : Object.values(formValues).some((val) => val.length === 0) ||
      Object.values(formErrors).some((val) => val.length > 0) ||
      Object.values(hasEdited).some((edited) => !edited)

  return (
    <>
      <form onSubmit={onSubmit}>
        <Switch
          checked={isUsernameLogin}
          onChange={() => setIsUsernameLogin(!isUsernameLogin)}
          editable
          name="Username or Email"
          leftLabel="Username"
          rightLabel="Email"
          leftIcon={<FaceIcon />}
          rightIcon={<EmailIcon />}
        />
        {!isUsernameLogin ? (
          <UsernameField
            id="username"
            style={{ paddingTop: '1.5rem' }}
            inputRef={null}
            value={formValues.username}
            onChange={(e: TextFieldChange) => handleUsernameChange(e)}
            error={formErrors.username}
            name="name"
            label="Username"
          />
        ) : (
          <EmailField
            id="email"
            name="email"
            value={formValues.email}
            error={formErrors.email}
            onChange={(e) => handleEmailChange(e)}
            inputRef={null}
          />
        )}
        <PasswordField
          id="currentPassword"
          showPassword={showPassword}
          value={formValues.password}
          error={formErrors.password}
          onChange={(e) => handlePasswordChange(e)}
          setShowPassword={() => setShowPassword(!showPassword)}
        />
        <SubmitButton disabled={disableSubmit}>
          {loading ? <LoadingIndicator /> : 'Log In'}
        </SubmitButton>
      </form>
      <SnackBar
        open={snackbarState.open}
        setOpen={(bool: boolean) => {
          setSnackbarState({
            ...snackbarState,
            open: bool,
          })
        }}
        message={snackbarState.message}
        severity="error"
      />
    </>
  )
}

export default LoginForm

import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import {
  EmailField,
  PasswordField,
  UsernameField,
  SubmitButton,
  SnackBar,
  LoadingIndicator,
} from '../../components'
import { ApiContext } from '../../contexts/apiContext'
import { TextFieldChange, PseudoEvent } from '../../types'
import { emailPattern, usernamePattern } from '../../utils/regex'

interface SignUpData {
  name: string
  email: string
  currentPassword: string
}

interface FormValues {
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  username: string
  email: string
  password: string
  confirmPassword: string
  signUp: string
}

interface ShowFields {
  password: boolean
  confirmPassword: boolean
}

const SignUpForm = () => {
  const { register, handleSubmit, reset } = useForm()
  const { apiService } = useContext(ApiContext)
  const router = useRouter()
  const [formValues, setFormValues] = useState<FormValues>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    signUp: '',
  })
  const [showFields, setShowFields] = useState<ShowFields>({
    password: false,
    confirmPassword: false,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [hasEdited, setHasEdited] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  })

  const handleUsernameChange = (e: TextFieldChange) => {
    const currentUsernameValue = e.target.value
    setFormValues({ ...formValues, username: currentUsernameValue })
    if (!hasEdited.username) {
      setHasEdited({ ...hasEdited, username: true })
    }
    if (currentUsernameValue.length === 0 && hasEdited.password) {
      setFormErrors({ ...formErrors, username: 'Please enter a username' })
    } else if (currentUsernameValue.length > 64) {
      setFormErrors({
        ...formErrors,
        username: 'Username cannot exceed 64 characters.',
      })
    } else if (!currentUsernameValue.match(usernamePattern)) {
      setFormErrors({ ...formErrors, username: 'Username not valid.' })
    } else setFormErrors({ ...formErrors, username: '' })
  }

  const handlePasswordChange = (
    e: TextFieldChange | PseudoEvent,
    ignoreHasEditedPassword?: boolean,
  ) => {
    const currentPasswordValue = e.target.value
    setFormValues({ ...formValues, password: currentPasswordValue })
    if (!hasEdited.password) setHasEdited({ ...hasEdited, password: true })
    if (currentPasswordValue.length === 0 && !ignoreHasEditedPassword) {
      setFormErrors({ ...formErrors, password: 'Please enter a password.' })
    } else if (currentPasswordValue.length < 6 && !ignoreHasEditedPassword) {
      setFormErrors({
        ...formErrors,
        password: 'Password must be at least 6 characters.',
      })
    } else if (currentPasswordValue.length > 128) {
      setFormErrors({
        ...formErrors,
        password: 'Password must not exceed 128 characters.',
      })
    } else if (currentPasswordValue.length === 1) {
      setFormErrors({
        ...formErrors,
        password: 'Password must be at least 6 characters.',
      })
    } else {
      setFormErrors({
        ...formErrors,
        password: '',
      })
    }

    if (
      currentPasswordValue !== formValues.confirmPassword &&
      hasEdited.confirmPassword
    ) {
      setFormErrors({
        ...formErrors,
        confirmPassword: 'Passwords did not match.',
      })
    } else {
      setFormErrors({
        ...formErrors,
        confirmPassword: '',
      })
    }
  }

  const handleConfirmPasswordChange = (
    e: TextFieldChange | PseudoEvent,
    ignoreHasEditedConfirmPassword?: boolean,
  ) => {
    const currentConfirmPasswordValue = e.target.value
    setFormValues({
      ...formValues,
      confirmPassword: currentConfirmPasswordValue,
    })
    if (!hasEdited.confirmPassword) {
      setHasEdited({
        ...hasEdited,
        confirmPassword: true,
      })
    }
    if (
      currentConfirmPasswordValue !== formValues.password &&
      !ignoreHasEditedConfirmPassword
    ) {
      setFormErrors({
        ...formErrors,
        confirmPassword: 'Passwords did not match.',
      })
    } else {
      setFormErrors({
        ...formErrors,
        confirmPassword: '',
      })
    }
  }

  const handleEmailChange = (e: TextFieldChange) => {
    const currentEmailValue = e.target.value
    setFormValues({ ...formValues, email: currentEmailValue })
    if (!hasEdited.email) {
      setHasEdited({
        ...hasEdited,
        email: true,
      })
    }
    if (currentEmailValue.length === 0) {
      setFormErrors({ ...formErrors, email: 'Please enter an email address.' })
    } else if (!currentEmailValue.match(emailPattern)) {
      setFormErrors({
        ...formErrors,
        email: 'Please enter a valid email address.',
      })
    } else if (currentEmailValue.length > 128) {
      setFormErrors({
        ...formErrors,
        email: 'Email address must not exceed 128 characters.',
      })
    } else setFormErrors({ ...formErrors, email: '' })
  }

  const onSubmit = (data: SignUpData) => {
    setLoading(true)
    reset()
    apiService
      .signUp(data)
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
          setFormErrors({
            ...formErrors,
            signUp: `That name (${formValues.username}) is already taken.`,
            username: 'Username must be unique',
          })
        } else if (err.message.includes('email')) {
          setFormErrors({
            ...formErrors,
            signUp: 'An account with this email already exists.',
          })
        } else {
          setFormErrors({
            ...formErrors,
            signUp:
              'Something went wrong. Please check that your information is correct.',
          })
        }
        setSnackbarOpen(true)
      })
  }

  const disabledSubmit: boolean =
    Object.values(formErrors).some((error: string) => error.length > 1) ||
    Object.values(hasEdited).some((didEdit) => !didEdit) ||
    Object.values(formValues).some((val) => val.length === 0)

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <UsernameField
          id="username"
          value={formValues.username}
          inputRef={register({ required: true })}
          onChange={(e: TextFieldChange) => handleUsernameChange(e)}
          error={formErrors.username}
          name="name"
          label="Username"
        />
        <EmailField
          id="email"
          value={formValues.email}
          inputRef={register({ required: true })}
          error={formErrors.email}
          onChange={(e: TextFieldChange) => handleEmailChange(e)}
        />
        <PasswordField
          id="new-password"
          value={formValues.password}
          inputRef={register({ required: true })}
          onChange={(e: TextFieldChange) => handlePasswordChange(e)}
          error={formErrors.password}
          name="currentPassword"
          label="New Password"
          showPassword={showFields.password}
          setShowPassword={() => {
            setShowFields({
              ...showFields,
              confirmPassword: !showFields.password,
            })
          }}
        />
        <PasswordField
          id="confirm-new-password"
          value={formValues.confirmPassword}
          onChange={(e: TextFieldChange) => handleConfirmPasswordChange(e)}
          error={formErrors.confirmPassword}
          name="confirmCurrentPassword"
          label="Confirm New Password"
          showPassword={showFields.confirmPassword}
          setShowPassword={() => {
            setShowFields({
              ...showFields,
              confirmPassword: !showFields.confirmPassword,
            })
          }}
        />
        <SubmitButton disabled={disabledSubmit}>
          {loading ? <LoadingIndicator /> : 'Sign up'}
        </SubmitButton>
      </form>
      <SnackBar
        open={snackbarOpen}
        setOpen={(bool: boolean) => setSnackbarOpen(bool)}
        message={formErrors.signUp}
        severity="error"
      />
    </>
  )
}

export default SignUpForm

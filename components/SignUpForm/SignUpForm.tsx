import { useState, useContext } from 'react'
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
import useWindowSize from '../../hooks/useWindowSize'
import { emailPattern, usernamePattern } from '../../utils/regex'
import { maxLength, minLength } from '../../utils/form'

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

interface FormUpdate {
  key: string
  value: string
}

type MultipleFormUpdate = FormUpdate[]

const SignUpForm = () => {
  const { apiService } = useContext(ApiContext)
  const router = useRouter()
  const { isLarge } = useWindowSize()
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

  const updateFormError = (key: string, value: string) => {
    setFormErrors({
      ...formErrors,
      [key]: value,
    })
  }

  const updateFormErrorMultiple = (newValues: MultipleFormUpdate) => {
    const [firstValue, secondValue] = newValues
    setFormErrors({
      ...formErrors,
      [firstValue.key]: firstValue.value,
      [secondValue.key]: secondValue.value,
    })
  }

  const handleUsernameChange = (e: TextFieldChange) => {
    const currentUsernameValue = e.target.value
    const updateError = (val: string) => updateFormError('username', val)
    setFormValues({ ...formValues, username: currentUsernameValue })
    if (!hasEdited.username) {
      setHasEdited({ ...hasEdited, username: true })
    }
    if (currentUsernameValue.length === 0 && hasEdited.username) {
      updateError('Please enter a username')
    } else if (currentUsernameValue.length > maxLength) {
      updateError(`Username cannot exceed ${maxLength} characters.`)
    } else if (!currentUsernameValue.match(usernamePattern)) {
      updateError('Username not valid.')
    } else updateError('')
  }

  const handlePasswordChange = (
    e: TextFieldChange | PseudoEvent,
    ignoreHasEditedPassword?: boolean,
  ) => {
    const currentPasswordValue = e.target.value
    const updateError = (val: string) => {
      updateFormError('password', val)
      let confirmPasswordError = ''
      if (
        currentPasswordValue !== formValues.confirmPassword &&
        hasEdited.confirmPassword
      ) {
        confirmPasswordError = 'Passwords did not match.'
      }
      updateFormErrorMultiple([
        {
          key: 'password',
          value: val,
        },
        {
          key: 'confirmPassword',
          value: confirmPasswordError,
        },
      ])
    }
    setFormValues({ ...formValues, password: currentPasswordValue })
    if (!hasEdited.password) setHasEdited({ ...hasEdited, password: true })
    if (currentPasswordValue.length === 0 && !ignoreHasEditedPassword) {
      updateError('Please enter a password.')
    } else if (
      currentPasswordValue.length < minLength &&
      !ignoreHasEditedPassword
    ) {
      updateError(`Password must be at least ${minLength} characters.`)
    } else if (currentPasswordValue.length > maxLength) {
      updateError(`Password must not exceed ${maxLength} characters.`)
    } else if (currentPasswordValue.length === 1) {
      updateError(`Password must be at least ${minLength} characters.`)
    } else updateError('')
  }

  const handleConfirmPasswordChange = (
    e: TextFieldChange | PseudoEvent,
    ignoreHasEditedConfirmPassword?: boolean,
  ) => {
    const currentConfirmPasswordValue = e.target.value
    const updateError = (val: string) => updateFormError('confirmPassword', val)
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
      updateError('Passwords did not match.')
    } else {
      updateError('')
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
    } else if (currentEmailValue.length > maxLength) {
      setFormErrors({
        ...formErrors,
        email: `Email address must not exceed ${maxLength} characters.`,
      })
    } else setFormErrors({ ...formErrors, email: '' })
  }

  const onSubmit = async (e) => {
    try {
      const data: SignUpData = {
        name: formValues.username,
        email: formValues.email,
        currentPassword: formValues.password,
      }
      e.preventDefault()
      setLoading(true)
      await apiService.signUp(data)
      await apiService.signIn({
        email: formValues.email,
        currentPassword: formValues.password,
      })
      await router.push('/')
    } catch (error) {
      const updateError = (val: string) => updateFormError('signUp', val)
      setLoading(false)
      const pseudoEvent: PseudoEvent = {
        target: {
          value: '',
        },
      }
      handlePasswordChange(pseudoEvent, true)
      handleConfirmPasswordChange(pseudoEvent, true)
      const err = error as Error
      if (err.message.includes('Username')) {
        setFormErrors({
          ...formErrors,
          signUp: `That name (${formValues.username}) is already taken.`,
          username: 'Username must be unique',
        })
      } else if (err.message.includes('email')) {
        updateError('An account with this email already exists.')
      } else {
        updateError(
          'Something went wrong. Please check that your information is correct.',
        )
      }
      setSnackbarOpen(true)
    }
  }

  const disabledSubmit: boolean =
    Object.values(formErrors).some((error: string) => error.length > 1) ||
    Object.values(hasEdited).some((didEdit) => !didEdit) ||
    Object.values(formValues).some((val) => val.length === 0)

  return (
    <>
      <form autoComplete="off" onSubmit={onSubmit}>
        <UsernameField
          id="username"
          style={{ paddingTop: isLarge ? '7rem' : '1.5rem' }}
          inputRef={null}
          value={formValues.username}
          onChange={(e: TextFieldChange) => handleUsernameChange(e)}
          error={formErrors.username}
          name="name"
          label="Username"
        />
        <EmailField
          id="email"
          inputRef={null}
          value={formValues.email}
          error={formErrors.email}
          onChange={(e: TextFieldChange) => handleEmailChange(e)}
        />
        <PasswordField
          id="new-password"
          value={formValues.password}
          onChange={(e: TextFieldChange) => handlePasswordChange(e)}
          error={formErrors.password}
          name="currentPassword"
          label="New Password"
          showPassword={showFields.password}
          setShowPassword={() => {
            setShowFields({
              ...showFields,
              password: !showFields.password,
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
        setOpen={(bool: boolean) => {
          setSnackbarOpen(bool)
          setFormErrors({
            ...formErrors,
            signUp: '',
          })
        }}
        message={formErrors.signUp}
        severity="error"
      />
    </>
  )
}

export default SignUpForm

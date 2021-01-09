import { useState, ChangeEvent } from 'react'
import { Paper, Button, TextField } from '@material-ui/core'
import { SnackBar, Layout } from '../components'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import { emailPattern } from '../utils/regex'
import colors from '../utils/colors'
import { AlertTitle } from '@material-ui/lab'

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

    const inputStyle = {
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'white',
        borderRadius: '0.25rem',
    }

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
        }
        else if (!currentEmailValue.match(emailPattern)) {
            setEmailError('Please enter a valid email address.')
        }
        else if (currentEmailValue.length > 128) {
            setEmailError('Email address must not exceed 128 characters.')
        } else setEmailError('')
    }

    const disableSubmit = emailError.length > 0 || !hasEditedEmail

    return (
        <Layout title='Forgot Password' hideLogInOut>
            <div style={{ textAlign: 'center' }}>
                <Paper style={{
                    width: '40%',
                    minWidth: '20rem',
                    padding: '1rem',
                    margin: 'auto',
                    backgroundColor: colors.primary,
                }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            id='email'
                            type='email'
                            name='email'
                            style={inputStyle}
                            label='Email'
                            inputRef={register({
                                required: true,
                            })}
                            value={email}
                            error={emailError.length > 0}
                            helperText={emailError}
                            onChange={e => handleEmailChange(e)}
                            variant='filled'
                        />
                        <Button
                            disabled={disableSubmit}
                            type='submit'
                            size='large'
                            style={{ backgroundColor: colors.quinary, marginTop: '1.5rem' }}
                        >
                            Send Email
                        </Button>
                    </form>
                    <SnackBar
                        open={snackbarOpen}
                        setOpen={(bool: boolean) => setSnackbarOpen(bool)}
                        message={forgotPasswordMessage}
                        severity={snackbarSeverity}
                    />
                </Paper>
            </div>
        </Layout>
    )
}

export default ForgotPage
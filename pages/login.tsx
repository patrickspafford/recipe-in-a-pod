import Link from 'next/link'
import { Paper, Button } from '@material-ui/core'
import { LoginForm, Layout } from '../components'
import colors from '../utils/colors'
import styles from '../styles/login.module.css'

const LoginPage = () => (
    <Layout title='Log In' hideLogInOut>
        <div style={{ textAlign: 'center' }}>
            <Paper style={{
                width: '40%',
                minWidth: '20rem',
                maxWidth: '40rem',
                padding: '1rem',
                margin: 'auto',
                backgroundColor: colors.primary,
            }}>
                <LoginForm />
                <div className={styles.tableStyle}>
                    <span>
                        Don't have an account?
                    </span>
                    <Link href='/signup'>
                        <Button
                            style={{
                                marginLeft: '1rem',
                                backgroundColor: colors.quinary,
                                padding: '0.15rem 0.5rem',
                                }}
                            size='small'
                        >
                            Sign up
                        </Button>
                    </Link>
                </div>
                <div className={styles.tableStyle}>
                    <span>
                        Forgot Password?
                    </span>
                    <Link href='/forgot'>
                        <Button
                            style={{
                                marginLeft: '1rem',
                                backgroundColor: colors.quinary,
                                padding: '0.15rem 0.5rem',
                                }}
                            size='small'
                        >
                            Reset
                        </Button>
                    </Link>
                </div>
            </Paper>
        </div>
    </Layout>
)

export default LoginPage
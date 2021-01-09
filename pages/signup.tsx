import Link from 'next/link'
import { SignUpForm }  from '../components'

const SignUpPage = () => (
    <div>
        <p>Sign up</p>
        <p>Already have an account?</p>
        <Link href='/login'>
            <a>Log in</a>
        </Link>
        <SignUpForm />
    </div>
)

export default SignUpPage
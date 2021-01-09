import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/router'

interface SignUpData {
    name: string
    email: string
    password: string
}

const SignUpForm = () => {

    const { register, errors, handleSubmit } = useForm()

    const auth = useAuth()
    const router = useRouter()

    const onSubmit = async (data: SignUpData) => {
        return auth.signUp(data)
          .then(() => router.push('/'))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='name'>
                    Name
                </label>
                <input
                  id='name'
                  type='text'
                  name='name'
                  ref={register({
                      required: 'Please enter a name.'
                  })}
                />
                {errors.name && (
                    <div>
                        {errors.name.message}
                    </div>
                )}
            </div>
            <div>
                <label htmlFor='email'>
                    Email
                </label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  ref={register({
                      required: 'Please enter an email.',
                      pattern: {
                          value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: 'Not a valid email.',
                    },
                  })}
                />
                {errors.email && (
                    <div>
                        {errors.email.message}
                    </div>
                )}
            </div>
            <div>
                <label htmlFor='currentPassword'>
                    Password
                </label>
                <input
                  id='currentPassword'
                  type='password'
                  name='currentPassword'
                  ref={register({
                      required: 'Please enter a password.',
                      minLength: {
                          value: 6,
                          message: 'Should have at least 6 characters.'
                      }
                  })}
                />
                {errors.currentPassword && (
                    <div>
                        {errors.currentPassword.message}
                    </div>
                )}
            </div>
            <button type='submit'>
                Sign Up
            </button>
            
        </form>
    )
}

export default SignUpForm
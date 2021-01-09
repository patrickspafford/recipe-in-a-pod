import { useContext, createContext, useEffect } from 'react'
import { auth, db } from '../firebase'
import { FirebaseUser } from '../types'
import { useCookies } from 'react-cookie'

export const useAuthProvider = () => {
    // const [user, setUser] = useState<any>(null)
    // const [username, setUsername] = useState<string>(null)

    const userCookieKey = 'recipe-user'
    const usernameCookieKey = 'recipe-username'
    const [userCookie, setUserCookie] = useCookies([userCookieKey, usernameCookieKey])


    const createUser = async (firebaseUser: FirebaseUser) => {
        return db
          .collection('users')
          .doc(firebaseUser.uid)
          .set(firebaseUser)
          .then(() => {
              // setUser(firebaseUser)
              setUserCookie(userCookieKey, JSON.stringify(firebaseUser), {
                  path: '/',
                  maxAge: 3600,
                  sameSite: true,
              })
              return firebaseUser
          })
          .catch(error => error)
    }

    const getUsername = async (userToGet: any) => {
        return db
          .collection('users')
          .doc(userToGet.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
                const foundUsername = doc.data().name
                // setUsername(foundUsername)
                setUserCookie(usernameCookieKey, foundUsername, {
                    path: '/',
                    maxAge: 3600,
                    sameSite: true,
                })
                return foundUsername
            }
            const usernameNotFound = 'Username Not Found'
            // setUsername(usernameNotFound)
            setUserCookie(usernameCookieKey, usernameNotFound, {
                path: '/',
                maxAge: 3600,
                sameSite: true,
            })
            return usernameNotFound
          })
          .catch(err => console.error(err))
    }

    const signUp = async ({ name, email, currentPassword }) => {
        return auth
          .createUserWithEmailAndPassword(email, currentPassword)
          .then((response) => {
              auth.currentUser.sendEmailVerification()
              .then(() => console.log(`Created user successfully!`))
              .then(() => createUser({ uid: response.user.uid, email, name }))
              .then(() => getUsername(response.user.uid))
              .catch(err => console.error(err))
          })
    }

    const sendForgotPasswordEmail = async ({ email }) => {
        const sentEmailSuccessfully =
          await auth.sendPasswordResetEmail(email)
            .then(() => true)
            .catch(err => {
                console.error(err)
                return false
            })
        return sentEmailSuccessfully
    }

    const logOut = () => {
        setUserCookie(userCookieKey, '')
        setUserCookie(usernameCookieKey, '')
    }

    const signIn = ({ email, currentPassword }) => (
        new Promise<void>((resolve, reject) => {
            return auth
          .signInWithEmailAndPassword(email, currentPassword)
          .then(response => {
              // setUser(response.user)
              setUserCookie(userCookieKey, JSON.stringify(response.user), {
                  path: '/',
                  maxAge: 3600,
                  sameSite: true
              })
              return response.user
          })
          .then(signedInUser => getUsername(signedInUser))
          .then(() => resolve())
          .catch(err => reject(err))
        })
    )

    const user = userCookie[userCookieKey] ? userCookie[userCookieKey] : null
    const username = userCookie[usernameCookieKey] ? userCookie[usernameCookieKey] : null

    return {
        user,
        username,
        loggedIn: user && username,
        setUserCookie,
        signUp,
        signIn,
        logOut,
        sendForgotPasswordEmail,
    }
}

const authContext = createContext({ user: {}})
const { Provider } = authContext

export const AuthProvider = ({ children }) => {
    const authProviderContent = useAuthProvider()
    return (
        <Provider value={authProviderContent}>
            {children}
        </Provider>
    )
}

export const useAuth: any = () => useContext(authContext)
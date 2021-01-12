import { useContext, createContext, ReactNode } from 'react'
import { useCookies } from 'react-cookie'
import { auth, db, storage } from '../firebase'
import { FirebaseUser } from '../types'

export const useAuthProvider = () => {
  const userCookieKey = 'recipe-user'
  const usernameCookieKey = 'recipe-username'
  const [userCookie, setUserCookie] = useCookies([
    userCookieKey,
    usernameCookieKey,
  ])

  const createUser = async (firebaseUser: FirebaseUser) => db
    .collection('users')
    .doc(firebaseUser.uid)
    .set(firebaseUser)
    .then(() => {
      setUserCookie(userCookieKey, JSON.stringify(firebaseUser), {
        path: '/',
        maxAge: 3600,
        sameSite: true,
      })
      return firebaseUser
    })
    .catch((error) => error)

  const getUsername = async (userToGet: any) => db
    .collection('users')
    .doc(userToGet.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const foundUsername = doc.data().name
        setUserCookie(usernameCookieKey, foundUsername, {
          path: '/',
          maxAge: 3600,
          sameSite: true,
        })
        return foundUsername
      }
      const usernameNotFound = ''
      setUserCookie(usernameCookieKey, usernameNotFound, {
        path: '/',
        maxAge: 3600,
        sameSite: true,
      })
      return usernameNotFound
    })
    .catch((err) => console.error(err))

  const usernameAlreadyExists = async (username: string) => {
    let alreadyExists = false
    await db
      .collection('users')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().name === username) {
            alreadyExists = true
          }
        })
      })
    return alreadyExists
  }

  const setProfilePhoto = async (file: File) => {
    const storageRef = storage.ref()
    const profilePhotoRef = storageRef.child(
      `profile-photos/${userCookie[userCookieKey]}`,
    )
    return profilePhotoRef
      .put(file)
      .then(() => 'Successfully uploaded profile photo!')
      .catch((err) => (err))
  }

  const signUp = async ({ name, email, currentPassword }) => {
    console.debug({
      name,
      email,
      currentPassword,
    })
    if (await usernameAlreadyExists(name)) {
      throw new Error(`Username ${name} already exists.`)
    } else {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        currentPassword,
      )
      await auth.currentUser.sendEmailVerification()
      console.log('Created user successfully')
      await createUser({ uid: response.user.uid, email, name })
      console.log('Created username successfully')
      await getUsername(response.user)

      /*
      return auth
        .createUserWithEmailAndPassword(email, currentPassword)
        .then((response) => {
          auth.currentUser.sendEmailVerification()
            .then(() => console.log('Created user successfully!'))
            .then(() => createUser({ uid: response.user.uid, email, name }))
            .then(() => console.log('Created username successfully!'))
            .then(() => getUsername(response.user))
            .catch((err) => err)
        })
        .catch((err: Error) => err)
        */
    }
  }

  const sendForgotPasswordEmail = async ({ email }) => {
    const sentEmailSuccessfully = await auth
      .sendPasswordResetEmail(email)
      .then(() => true)
      .catch((err) => {
        console.error(err)
        return false
      })
    return sentEmailSuccessfully
  }

  const logOut = () => {
    setUserCookie(userCookieKey, '')
    setUserCookie(usernameCookieKey, '')
  }

  const signIn = ({ email, currentPassword }) => new Promise<void>((resolve, reject) => auth
    .signInWithEmailAndPassword(email, currentPassword)
    .then((response) => {
      setUserCookie(userCookieKey, JSON.stringify(response.user), {
        path: '/',
        maxAge: 3600,
        sameSite: true,
      })
      return response.user
    })
    .then((signedInUser) => getUsername(signedInUser))
    .then(() => resolve())
    .catch((err) => reject(err)))

  const user = userCookie[userCookieKey] ? userCookie[userCookieKey] : null
  const username = userCookie[usernameCookieKey]
    ? userCookie[usernameCookieKey]
    : null

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

const authContext = createContext({ user: {} })
const { Provider } = authContext

interface IAuthProvider {
  children: ReactNode
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const authProviderContent = useAuthProvider()
  return <Provider value={authProviderContent}>{children}</Provider>
}

export const useAuth: any = () => useContext(authContext)

import {
  useContext, createContext, ReactNode,
} from 'react'
import { useCookies } from 'react-cookie'
import { auth, db, storage } from '../firebase'
import { FirebaseUser } from '../types'

export const useAuthProvider = () => {
  const userCookieKey = 'recipe-user'
  const usernameCookieKey = 'recipe-username'
  const profilePhotoKey = 'recipe-profile-photo'
  const [userCookie, setUserCookie] = useCookies([
    userCookieKey,
    usernameCookieKey,
    profilePhotoKey,
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

  const setProfilePhotoInStorage = async (file: File) => {
    const storageRef = storage.ref()
    if (!userCookie[usernameCookieKey]) {
      throw new Error('Username not found for profile photo setting.')
    }
    const profilePhotoRef = storageRef.child(
      `profile-photos/${userCookie[usernameCookieKey]}`,
    )
    return profilePhotoRef
      .put(file)
      .then(() => 'Successfully uploaded profile photo!')
      .catch((err) => (err))
  }

  const getProfilePhoto = async (username: string) => {
    const storageRef = storage.ref()
    storageRef.child(`profile-photos/${username}`).getDownloadURL()
      .then((url) => {
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        // eslint-disable-next-line no-unused-vars
        xhr.onload = (e) => {
          // eslint-disable-next-line no-unused-vars
          const blob = xhr.response
        }
        xhr.open('GET', url)
        xhr.send()
        setUserCookie(profilePhotoKey, url, {
          path: '/',
          maxAge: 3600,
          sameSite: true,
        })
      })
      .then(() => console.log('Got profile photo!'))
      .catch((err) => console.error(err))
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
    setUserCookie(profilePhotoKey, '')
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
    .then((username) => getProfilePhoto(username))
    .then(() => resolve())
    .catch((err) => reject(err)))

  const user = userCookie[userCookieKey] ? userCookie[userCookieKey] : null
  const username = userCookie[usernameCookieKey]
    ? userCookie[usernameCookieKey]
    : null
  const profilePhoto = userCookie[profilePhotoKey] ? userCookie[profilePhotoKey] : null

  return {
    user,
    username,
    loggedIn: user && username,
    profilePhoto,
    setUserCookie,
    setProfilePhotoInStorage,
    getProfilePhoto,
    signUp,
    signIn,
    logOut,
    sendForgotPasswordEmail,
  }
}

export const AuthContext = createContext({ user: {}, username: '', loggedIn: false })
const { Provider } = AuthContext

interface IAuthProvider {
  children: ReactNode
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const authProviderContent = useAuthProvider()
  return <Provider value={authProviderContent}>{children}</Provider>
}

export const useAuth: any = () => useContext(AuthContext)

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import cookies from 'js-cookie'
import firebase from 'firebase'
import initFirebase from '../firebase/initFirebase'
import { UserCookie } from '../types'
import isJSONString from '../utils/parsing'

initFirebase()

const useUser = () => {
  const [user, setUser] = useState<UserCookie>({
    id: '',
    email: '',
    username: '',
    token: '',
    profilePhotoLink: '',
  })
  const router = useRouter()
  const cookieKey = 'auth'

  const logout = async () => firebase.auth()
    .signOut()
    .then(() => {
      cookies.remove(cookieKey)
      setUser(null)
      router.push('/login')
    })
    .catch((e) => {
      console.error(e)
    })

  useEffect(() => {
    const cookie = cookies.get(cookieKey)
    if (cookie && isJSONString(cookie)) setUser(JSON.parse(cookie))
  }, [])

  return {
    user,
    setUser,
    loggedIn: user ? !!(user.username && user.token && user.email) : false,
    logout,
  }
}

export default useUser

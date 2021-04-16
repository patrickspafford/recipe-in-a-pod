import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import cookies from 'js-cookie'
import firebase from 'firebase'
import initFirebase from '../firebase/initFirebase'
import { UserCookie } from '../types'
import cookieName from '../utils/cookie'
import isJSONString from '../utils/parsing'

initFirebase()

const useUser = () => {
  const [user, setVanillaUser] = useState<UserCookie>({
    id: '',
    email: '',
    username: '',
    token: '',
    profilePhotoLink: '',
  })
  const router = useRouter()

  const setUser = (userData: UserCookie) => {
    cookies.set(cookieName, userData, {
      expires: 1,
    })
    setVanillaUser(userData)
  }

  const logout = async () => {
    try {
      await firebase.auth().signOut()
      cookies.remove(cookieName)
      setVanillaUser(null)
      await router.push('/login')
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const cookie = cookies.get(cookieName)
    if (cookie && isJSONString(cookie)) setVanillaUser(JSON.parse(cookie))
  }, [])

  return {
    user,
    setUser,
    loggedIn: user ? !!(user.username && user.token && user.email) : false,
    logout,
  }
}

export default useUser

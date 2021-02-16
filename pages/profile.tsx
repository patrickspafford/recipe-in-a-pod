import { useRef } from 'react'
import { Layout } from '../components'
import { useAuth } from '../hooks/useAuth'

const ProfilePage = () => {
  const auth = useAuth()
  const fileSubmissionRef = useRef<HTMLInputElement | null>(null)

  /*
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const profilePhoto = fileSubmissionRef.current.files[0]
    auth.setProfilePhotoInStorage(profilePhoto)
      .then((message: string) => console.log(message))
      .then(() => auth.getProfilePhoto(auth.username)
        .then((msg) => console.log(msg))
        .catch((err) => console.error(err)))
      .catch((err: Error) => console.error(err))
  }
  */

  /*
  return (
    <Layout title={auth.username || 'Username Not Found'}>
      {auth.loggedIn ? 'Profile Page' : 'Nope'}
      <form onSubmit={handleSubmit}>
        <input type="file" ref={fileSubmissionRef} accept="image/png, image/jpeg" />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  )
  */
  return <Layout title="Profile">{auth.username}</Layout>
}

export default ProfilePage

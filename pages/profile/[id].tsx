import { useRef, FormEvent, useContext } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '../../components'
import useUser from '../../hooks/useUser'
import { ApiContext } from '../../contexts/apiContext'

const ProfilePage = () => {
  const { loggedIn, user, setUser } = useUser()
  const router = useRouter()
  const { apiService } = useContext(ApiContext)
  const fileSubmissionRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const profilePhoto = fileSubmissionRef.current.files[0]
    apiService.setProfilePhotoInStorage(profilePhoto, user.username)
      .then(() => {
        apiService.getProfilePhoto(user.username)
          .then((newLink) => {
            setUser({ ...user, profilePhotoLink: newLink })
            setTimeout(() => router.push(`/profile/${user.username}`), 1000)
          })
          .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
  }

  return (
    <Layout title={user.username}>
      {loggedIn ? 'Profile Page' : 'Not Signed In'}
      <form onSubmit={handleSubmit}>
        <input type="file" ref={fileSubmissionRef} accept="image/png, image/jpeg" />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  )
}

export default ProfilePage

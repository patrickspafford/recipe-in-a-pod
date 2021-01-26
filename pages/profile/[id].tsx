import { useRef, FormEvent, useContext } from 'react'
import { useRouter } from 'next/router'
import { Layout, FileSubmission, SubmitButton } from '../../components'
import useUser from '../../hooks/useUser'
import { ApiContext } from '../../contexts/apiContext'
import styles from '../../styles/profile.module.css'

const ProfilePage = () => {
  const { user, setUser } = useUser()
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
      <form className={styles.fileForm} onSubmit={handleSubmit}>
        <FileSubmission ref={fileSubmissionRef} />
        <SubmitButton disabled={!fileSubmissionRef}>Upload</SubmitButton>
      </form>
    </Layout>
  )
}

export default ProfilePage

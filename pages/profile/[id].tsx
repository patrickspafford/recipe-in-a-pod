import { useRef, FormEvent, useContext, useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { Layout, SubmitButton, FileButton, PhotoFrame } from '../../components'
import useUser from '../../hooks/useUser'
import { ApiContext } from '../../contexts/apiContext'
import styles from '../../styles/profile.module.css'

const ProfilePage = () => {
  const { user, setUser } = useUser()
  const [image, setImage] = useState<string>()
  const router = useRouter()
  const { apiService } = useContext(ApiContext)
  const fileSubmissionRef = useRef<HTMLInputElement | null>(null)

  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const profilePhoto = fileSubmissionRef.current.files[0]
    apiService
      .setProfilePhotoInStorage(profilePhoto, user.id)
      .then(() => {
        apiService
          .getProfilePhoto(user.id)
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
        <PhotoFrame imageTarget={image} height={400} />
        <FileButton inputRef={fileSubmissionRef} setImage={handleSetImage} />
        <SubmitButton disabled={!fileSubmissionRef}>Upload</SubmitButton>
      </form>
    </Layout>
  )
}

export default ProfilePage

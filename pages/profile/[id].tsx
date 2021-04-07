// eslint-disable-next-line object-curly-newline
import { useRef, FormEvent, useContext, useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { withAuth } from '../../hoc'
import {
  Layout,
  SubmitButton,
  FileButton,
  PhotoFrame,
  LoadingIndicator,
  PencilTextField,
} from '../../components'
import useUser from '../../hooks/useUser'
import { ApiContext } from '../../contexts/apiContext'
import styles from '../../styles/profile.module.css'

interface IProfilePage {
  username: string
}

const ProfilePage = ({ username }: IProfilePage) => {
  const { user, setUser } = useUser()
  const [image, setImage] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [newUsername, setNewUsername] = useState<string>(username)
  const [editingUsername, setEditingUsername] = useState<boolean>(false)
  const [loadingUsername, setLoadingUsername] = useState<boolean>(false)
  const router = useRouter()
  const { apiService } = useContext(ApiContext)
  const fileSubmissionRef = useRef<HTMLInputElement | null>(null)

  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setLoading(true)
      const profilePhoto = fileSubmissionRef.current.files[0]
      await apiService.setProfilePhotoInStorage(profilePhoto, user.id)
      const newLink = await apiService.getProfilePhoto(user.id)
      setUser({ ...user, profilePhotoLink: newLink })
      setLoading(false)
      router.reload()
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const handleSubmitNewUsername = async (e) => {
    try {
      setLoadingUsername(true)
    } catch (e) {}
  }

  return (
    <Layout title={username}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <div className={styles.fileForm}>
            <PhotoFrame imageTarget={image} height={400} borderRadius="50%" />
            <FileButton
              inputRef={fileSubmissionRef}
              setImage={handleSetImage}
            />
            <PencilTextField
              id="Username"
              showPencil={!editingUsername}
              setShowPencil={() => setEditingUsername(!editingUsername)}
              label="Username"
              error=""
              loading={false}
              onChange={(e) => setNewUsername(e.target.value)}
              name="Username"
              value={newUsername}
            />
          </div>
          <form className={styles.fileForm} onSubmit={handleSubmit}>
            <SubmitButton disabled={!fileSubmissionRef}>
              {loading ? <LoadingIndicator /> : 'Upload'}
            </SubmitButton>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    username: context.params.id,
  },
})

export default withAuth(ProfilePage)

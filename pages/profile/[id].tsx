// eslint-disable-next-line object-curly-newline
import { useRef, FormEvent, useContext, useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { Paper, List, ListItem } from '@material-ui/core'
import {
  Layout,
  SubmitButton,
  FileButton,
  PhotoFrame,
  LoadingIndicator,
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
  const router = useRouter()
  const { apiService } = useContext(ApiContext)
  const fileSubmissionRef = useRef<HTMLInputElement | null>(null)

  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const profilePhoto = fileSubmissionRef.current.files[0]
    apiService
      .setProfilePhotoInStorage(profilePhoto, user.id)
      .then(() => {
        apiService
          .getProfilePhoto(user.id)
          .then((newLink) => {
            setUser({ ...user, profilePhotoLink: newLink })
            setTimeout(() => router.push('/'), 1500)
          })
          .catch((err) => {
            setLoading(false)
            console.log('Error setting profile photo.')
            console.error(err)
          })
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }

  return (
    <Layout title={username}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* <Paper>
          <List>
            <ListItem>Hello</ListItem>
          </List>
        </Paper> */}
        <div>
          <div className={styles.fileForm}>
            <PhotoFrame imageTarget={image} height={400} borderRadius="50%" />
            <FileButton
              inputRef={fileSubmissionRef}
              setImage={handleSetImage}
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

export default ProfilePage

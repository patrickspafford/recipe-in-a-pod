// eslint-disable-next-line object-curly-newline
import {
  useRef,
  FormEvent,
  useContext,
  useState,
  ChangeEvent,
  useEffect,
} from 'react'
import firebase from 'firebase/app'
import 'firebase/functions'
import * as cookie from 'cookie'
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
import { TextFieldChange } from '../../types'
import { usernamePattern } from '../../utils/regex'
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
  const [usernameError, setUsernameError] = useState<string>('')
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

  const handleInvalidUsername = (errorMsg: string) => {
    setUsernameError(errorMsg)
    setNewUsername(username)
    throw new Error(errorMsg)
  }

  const handleSubmitNewUsername = async () => {
    try {
      if (username === newUsername) return
      setLoadingUsername(true)
      if (!newUsername.match(usernamePattern)) {
        handleInvalidUsername('Username not valid.')
        return
      }
      if (newUsername.length === 0) {
        handleInvalidUsername('Please enter a username.')
        return
      }
      if (newUsername.length > 64) {
        handleInvalidUsername('Username cannot exceed 64 characters.')
      }
      if (await apiService.usernameAlreadyExists(newUsername)) {
        handleInvalidUsername('That username already exists.')
        return
      }
      const succeededChange = await apiService.changeUsername(
        user.id,
        newUsername,
      )
      if (succeededChange) {
        setUser({ ...user, username: newUsername })
        await router.push(`/profile/${newUsername}`)
        router.reload()
      } else {
        setUsernameError('Something went wrong!')
      }
      setLoadingUsername(false)
    } catch (e) {
      setLoadingUsername(false)
    }
  }

  const handleUsernameChange = (e: TextFieldChange) => {
    const currentUsernameValue = e.target.value
    setNewUsername(currentUsernameValue)
    if (currentUsernameValue.length === 0) {
      setUsernameError('Please enter a username.')
    } else if (currentUsernameValue.length > 64) {
      setUsernameError('Username cannot exceed 64 characters.')
    } else if (!currentUsernameValue.match(usernamePattern)) {
      setUsernameError('Username not valid.')
    } else setUsernameError('')
  }

  useEffect(() => {
    if (!editingUsername) {
      handleSubmitNewUsername()
    } else {
      setUsernameError('')
    }
  }, [editingUsername])

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
            <form className={styles.fileForm} onSubmit={handleSubmit}>
              <SubmitButton disabled={!fileSubmissionRef}>
                {loading ? <LoadingIndicator /> : 'Upload Photo'}
              </SubmitButton>
            </form>
          </div>
          <PencilTextField
            id="Username"
            showPencil={!editingUsername}
            setShowPencil={() => setEditingUsername(!editingUsername)}
            label="Username"
            error={usernameError}
            loading={loadingUsername}
            onChange={handleUsernameChange}
            name="Username"
            value={newUsername}
          />
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const usernamePageExists = firebase
    .functions()
    .httpsCallable('usernamePageExists')
  try {
    const userId = JSON.parse(cookie.parse(context.req.headers.cookie).auth).id
    const validUsername = await usernamePageExists({
      username: context.params.id,
      userId,
    })
    if (validUsername) {
      return {
        props: {
          username: context.params.id,
        },
      }
    }
    return {
      props: {
        username: 'Not Found',
      },
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  } catch (e) {
    console.error(e)
    return {
      props: {
        username: 'Not Found',
      },
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }
}

export default withAuth(ProfilePage)

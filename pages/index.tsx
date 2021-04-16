import { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { ApiContext } from '../contexts/apiContext'
// eslint-disable-next-line object-curly-newline
import { Layout, Pod, LoadingContent, AddButton, SnackBar } from '../components'
import { withAuth } from '../hoc'
import useUser from '../hooks/useUser'
import { PodType } from '../types'
// import useWindowSize from '../hooks/useWindowSize'
import styles from '../styles/index.module.css'

interface SnackbarState {
  message: string
  open: boolean
  severity: 'error' | 'success'
}

const Home = () => {
  const { loggedIn, user } = useUser()
  const [loading, setLoading] = useState<boolean>(true)
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    message: '',
    open: false,
    severity: 'error',
  })
  const [pods, setPods] = useState<PodType[]>([])
  const router = useRouter()
  const { apiService } = useContext(ApiContext)
  const getPods = async () => {
    try {
      const allPods = await apiService.getPods(user.id)
      setPods(allPods)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getPods()
  }, [loggedIn, user])

  const handleDelete = async (docId: string) => {
    setLoading(true)
    try {
      await apiService.deletePod(user.id, docId)
      await getPods()
      setSnackbarState({
        open: true,
        severity: 'success',
        message: 'Deleted pod successfully!',
      })
    } catch (e) {
      console.error(e)
      setSnackbarState({
        open: true,
        severity: 'error',
        message: 'Failed to delete pod...',
      })
      getPods()
    }
  }
  const handleEdit = async (pod: PodType) => {
    try {
      await router.push(`/recipes/${pod.docId}/edit/${pod.name}`)
    } catch (e) {
      console.error(e)
    }
  }

  const render = () => {
    if (loading) {
      return <LoadingContent />
    }
    return (
      <>
        <div className={styles.podGrid}>
          {pods.map((pod) => (
            <Pod
              key={pod.docId}
              pod={pod}
              onEdit={() => handleEdit(pod)}
              onDelete={() => handleDelete(pod.docId)}
            />
          ))}
          <AddButton />
        </div>
        <SnackBar
          open={snackbarState.open}
          setOpen={(bool: boolean) => {
            setSnackbarState({
              ...snackbarState,
              open: bool,
            })
          }}
          message={snackbarState.message}
          severity={snackbarState.severity}
        />
      </>
    )
  }
  return <Layout title="My Pods">{render()}</Layout>
}

export default withAuth(Home)

import { useEffect, useContext, useState } from 'react'
import copy from 'copy-to-clipboard'
import { withAuth } from '../hoc'
// eslint-disable-next-line object-curly-newline
import { Layout, Pod, LoadingIndicator, SnackBar } from '../components'
import { PodType } from '../types'
import { ApiContext } from '../contexts/apiContext'
import styles from '../styles/browse.module.css'
import useUser from '../hooks/useUser'

interface SnackbarState {
  open: boolean
  message: string
  severity: 'error' | 'success'
}

const BrowsePage = () => {
  const { user } = useUser()
  const [pods, setPods] = useState<PodType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'error',
  })
  const { apiService } = useContext(ApiContext)

  const getPublicPods = async () => {
    try {
      if (!loading) setLoading(true)
      const publicPods = await apiService.getPublicPods()
      setPods(publicPods)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const handleRate = async (rating: number, docId: string) => {
    try {
      setLoading(true)
      await apiService.ratePod(user.id, docId, rating)
      await getPublicPods()
      setSnackbarState({
        open: true,
        message: 'Successfully rated pod.',
        severity: 'success',
      })
    } catch (e) {
      console.error(e)
      setSnackbarState({
        open: true,
        message: 'Could not rate pod at this time.',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleShare = (pod: PodType) => {
    const currentLocation = window.location.href
    const podLocation = `${currentLocation.split('browse')[0]}recipes/${
      pod.docId
    }/${encodeURIComponent(pod.name)}`
    copy(podLocation)
    setSnackbarState({
      open: true,
      message: 'Copied to clipboard!',
      severity: 'success',
    })
  }

  useEffect(() => {
    getPublicPods()
  }, [])

  return (
    <Layout title="Browse Recipes">
      {loading ? (
        <div className={styles.loading}>
          <LoadingIndicator size={160} />
        </div>
      ) : (
        <div className={styles.podGrid}>
          {pods.map((pod: PodType) => (
            <Pod
              pod={pod}
              canModify={false}
              onRate={(rating: number) => handleRate(rating, pod.docId)}
              onShare={() => handleShare(pod)}
              showRate={user && user.id !== pod.uid}
            />
          ))}
        </div>
      )}
      <SnackBar
        open={snackbarState.open}
        setOpen={
          (bool: boolean) =>
            setSnackbarState({
              ...snackbarState,
              open: bool,
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
        message={snackbarState.message}
        severity={snackbarState.severity}
      />
    </Layout>
  )
}

export default withAuth(BrowsePage)

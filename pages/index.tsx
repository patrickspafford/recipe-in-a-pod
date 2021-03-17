import Link from 'next/link'
import { useEffect, useContext, useState } from 'react'
import { ApiContext } from '../contexts/apiContext'
import { Layout, Pod, LoadingIndicator, AddButton } from '../components'
import useUser from '../hooks/useUser'
import { PodType } from '../types'
import styles from '../styles/index.module.css'

const Home = () => {
  const { loggedIn, user } = useUser()
  const [loading, setLoading] = useState<boolean>(true)
  const [pods, setPods] = useState<PodType[]>([])
  // const [snackbarStatus, setSnackbarStatus] = useState<>(false)
  const { apiService } = useContext(ApiContext)
  useEffect(() => {
    apiService
      .getPods(user.id)
      .then((result) => {
        setPods(result)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [loggedIn, user])
  /*
  const handleDelete = async (docId: string) => {
    setLoading(true)
    try {
      await apiService.deletePod(user.id, docId)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  const handleEdit = (e) => {}
  */

  const render = () => {
    if (loading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10%',
            alignItems: 'center',
          }}
        >
          <LoadingIndicator size={160} />
        </div>
      )
    }
    if (loggedIn) {
      return (
        <div className={styles.podGrid}>
          {pods.map((pod) => (
            <Pod
              key={pod.docId}
              pod={pod}
              // onEdit={() => handleEdit(pod.docId)}
              // onDelete={() => handleDelete(pod.docId)}
            />
          ))}
          <AddButton />
        </div>
      )
    }
    console.log(user)
    return (
      <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
        <Link href="/login">Please sign in</Link>
      </div>
    )
  }
  return <Layout title="My Pods">{render()}</Layout>
}

export default Home

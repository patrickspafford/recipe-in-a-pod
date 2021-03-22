import Link from 'next/link'
import { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { ApiContext } from '../contexts/apiContext'
import { Layout, Pod, LoadingIndicator, AddButton } from '../components'
import useUser from '../hooks/useUser'
import { PodType } from '../types'
import styles from '../styles/index.module.css'

const Home = () => {
  const { loggedIn, user } = useUser()
  const [loading, setLoading] = useState<boolean>(true)
  const [pods, setPods] = useState<PodType[]>([])
  const router = useRouter()
  // const [snackbarStatus, setSnackbarStatus] = useState<>(false)
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
      getPods()
    } catch (e) {
      console.error(e)
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
              onEdit={() => handleEdit(pod)}
              onDelete={() => handleDelete(pod.docId)}
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

import { useEffect, useContext, useState } from 'react'
import { withAuth } from '../hoc'
import { Layout, Pod, LoadingIndicator } from '../components'
import { PodType } from '../types'
import { ApiContext } from '../contexts/apiContext'
import styles from '../styles/browse.module.css'
import useUser from '../hooks/useUser'

const BrowsePage = () => {
  const { user } = useUser()
  const [pods, setPods] = useState<PodType[]>([])
  const [loading, setLoading] = useState(true)
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
      // refetch ratings
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.error(e)
    }
  }

  const handleShare = async (pod) => {}

  useEffect(() => {
    getPublicPods()
  }, [])

  return (
    <Layout title="Browse Recipes">
      {loading ? (
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
    </Layout>
  )
}

export default withAuth(BrowsePage)

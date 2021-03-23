import { useEffect, useContext, useState } from 'react'
import { withAuth } from '../hoc'
import { Layout, Pod } from '../components'
import { PodType } from '../types'
import { ApiContext } from '../contexts/apiContext'
import styles from '../styles/browse.module.css'

const BrowsePage = () => {
  const [pods, setPods] = useState<PodType[]>([])
  const { apiService } = useContext(ApiContext)

  const getPublicPods = async () => {
    try {
      // setLoading(true)
      const publicPods = await apiService.getPublicPods()
      setPods(publicPods)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getPublicPods()
  }, [])

  return (
    <Layout title="Browse Recipes">
      <div className={styles.podGrid}>
        {pods.map((pod: PodType) => (
          <Pod pod={pod} onDelete={() => {}} onEdit={() => {}} />
        ))}
      </div>
    </Layout>
  )
}

export default withAuth(BrowsePage)

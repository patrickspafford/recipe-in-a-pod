import Link from 'next/link'
import { useEffect, useContext, useState } from 'react'
import { ApiContext } from '../contexts/apiContext'
import { Layout, Pod } from '../components'
import useUser from '../hooks/useUser'
import { PodType } from '../types'
import styles from '../styles/index.module.css'

const Home = () => {
  const { loggedIn, user } = useUser()
  const [loading, setLoading] = useState<boolean>(true)
  const [pods, setPods] = useState<PodType[]>([])
  const { apiService } = useContext(ApiContext)
  const noLongerLoading = () => setLoading(false)
  const gotPods = (podsResult: PodType[]) => {
    setLoading(false)
    setPods(podsResult)
  }
  useEffect(() => {
    apiService.getPods('vqCMVwUtFHhyfwI1r9NDR6rF7Sh1')
      .then((result) => {
        gotPods(result)
      })
      .catch((err) => {
        console.error(err)
        noLongerLoading()
      })
  }, [])
  return (
    <Layout title="My Pods">
      {
          loggedIn
            ? (
              <div className={styles.podGrid}>
                {pods.map((pod) => (
                  <Pod key={pod.docId} imageSrc={pod.photoLink || '/shrimp.jpg'} />
                ))}
              </div>
            )
            : (
              <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
                <Link href="/login">Sign in</Link>
              </div>
            )
      }
    </Layout>
  )
}

export default Home

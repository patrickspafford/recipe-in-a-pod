import Link from 'next/link'
import { Layout, Pod } from '../components'
import useUser from '../hooks/useUser'
import styles from '../styles/index.module.css'

const Home = () => {
  const { loggedIn } = useUser()
  return (
    <Layout title="My Pods">
      {
          loggedIn
            ? (
              <div className={styles.podGrid}>
                <Pod imageSrc="/shrimp.jpg" />
                <Pod imageSrc="/shrimp.jpg" />
                <Pod imageSrc="/shrimp.jpg" />
                <Pod imageSrc="/shrimp.jpg" />
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

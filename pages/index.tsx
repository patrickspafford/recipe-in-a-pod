import Link from 'next/link'
import { Layout, Pod } from '../components'
import { useAuth } from '../hooks/useAuth'

const Home = () => {
  const auth = useAuth()
  return (
    <Layout title="My Pods">
      {
          auth.loggedIn
            ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(22rem, 1fr))',
                gap: '1.5rem',
              }}
              >
                <Pod imageSrc="/shrimp.jpg" />
                <Pod imageSrc="/shrimp.jpg" />
                <Pod imageSrc="/shrimp.jpg" />
                <Pod imageSrc="/shrimp.jpg" />
              </div>
            )
            : (
              <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
                🧁
                {' '}
                <Link href="/login">Sign in</Link>
                {' '}
                you little fudge muffin stick.
              </div>
            )
      }
    </Layout>
  )
}

export default Home

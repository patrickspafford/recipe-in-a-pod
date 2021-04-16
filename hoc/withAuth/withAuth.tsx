import Link from 'next/link'
import { Button, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Layout } from '../../components'
import useWindowSize from '../../hooks/useWindowSize'
import useUser from '../../hooks/useUser'
import colors from '../../utils/colors'

const withAuth = (WrappedComponent: any) => (props: any) => {
  const [hadTimeToLoad, setHadTimeToLoad] = useState<boolean>(false)
  const { windowSize } = useWindowSize()
  const { loggedIn } = useUser()
  useEffect(() => {
    setTimeout(() => {
      setHadTimeToLoad(true)
    }, 1000)
  }, [])
  if (loggedIn || !hadTimeToLoad) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} />
  }

  const peaWidth = () => {
    if (!windowSize) {
      return 680
    }
    return Math.round(3 * (windowSize / 4))
  }

  const peaHeight = () => Math.round(peaWidth() * 0.41)
  return (
    <Layout title="Sign In">
      <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
        <div>
          <img
            src="/pea_people.png"
            width={peaWidth()}
            height={peaHeight()}
            alt="Pea people"
          />
        </div>
        <Typography variant="h3" style={{ padding: '2rem' }}>
          Welcome to Recipe Pods!
        </Typography>
        <Link href="/login">
          <a>
            <Button style={{ backgroundColor: colors.quinary }}>sign in</Button>
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export default withAuth

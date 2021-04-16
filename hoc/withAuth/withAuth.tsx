import Link from 'next/link'
import { Button, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Layout, LoadingContent } from '../../components'
import useUser from '../../hooks/useUser'
import colors from '../../utils/colors'

const withAuth = (WrappedComponent: any) => (props: any) => {
  const [hadTimeToLoad, setHadTimeToLoad] = useState<boolean>(false)
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
  return (
    <Layout title="Sign In">
      <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
        <div>
          <img
            src="/pea_people.png"
            width={680}
            height={279}
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

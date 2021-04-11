import Link from 'next/link'
import Image from 'next/image'
import { Button, Typography } from '@material-ui/core'
import { ReactNode } from 'react'
import { Layout } from '../../components'
import useUser from '../../hooks/useUser'
import colors from '../../utils/colors'

const withAuth = (WrappedComponent) => (props: any) => {
  const { loggedIn } = useUser()
  if (loggedIn) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} />
  }
  return (
    <Layout title="Sign In">
      <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
        <div>
          <Image src="/pea_people.png" width={680} height={279} />
        </div>
        <Typography variant="h3" style={{ padding: '2rem' }}>
          Welcome to Recipe Pods!
        </Typography>
        <Link href="/login">
          <Button style={{ backgroundColor: colors.quinary }}>sign in</Button>
        </Link>
      </div>
    </Layout>
  )
}

export default withAuth

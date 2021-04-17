import Link from 'next/link'
import { Button, Typography } from '@material-ui/core'
import { Layout } from '../components'
import colors from '../utils/colors'
import useWindowSize from '../hooks/useWindowSize'

const NotAuthorized = () => {
  const { windowSize } = useWindowSize()
  const peaWidth = () => {
    if (!windowSize) {
      return 680
    }
    return Math.min(Math.round(3 * (windowSize / 4)), 680)
  }

  const peaHeight = () => Math.round(peaWidth() * 0.41)
  return (
    <Layout title="Not Found">
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
          Not Authorized
        </Typography>
        <Typography variant="h6" style={{ padding: '2rem' }}>
          Sorry, you cannot access this resource.
        </Typography>
        <Link href="/">
          <a>
            <Button style={{ backgroundColor: colors.quinary }}>
              Back to Home
            </Button>
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export default NotAuthorized

import Link from 'next/link'
import { Button, Typography } from '@material-ui/core'
import { Layout } from '../components'
import colors from '../utils/colors'
import useWindowSize from '../hooks/useWindowSize'

const Custom404 = () => {
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
            alt="Pea People"
          />
        </div>
        <Typography variant="h3" style={{ padding: '2rem' }}>
          404 - Not Found
        </Typography>
        <Typography variant="h6" style={{ padding: '2rem' }}>
          Sorry, we couldn&apos;t find that page!
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

export default Custom404

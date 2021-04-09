import Link from 'next/link'
import Image from 'next/image'
import { Button, Typography } from '@material-ui/core'
import { Layout } from '../components'
import colors from '../utils/colors'

const Custom404 = () => (
  <Layout title="Not Found">
    <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
      <div>
        <Image src="/pea_people.png" width={680} height={279} />
      </div>
      <Typography variant="h3" style={{ padding: '2rem' }}>
        404 - Not Found
      </Typography>
      <Typography variant="h6" style={{ padding: '2rem' }}>
        Sorry, we couldn&apos;t find that page!
      </Typography>
      <Link href="/">
        <Button style={{ backgroundColor: colors.quinary }}>
          Back to Home
        </Button>
      </Link>
    </div>
  </Layout>
)

export default Custom404

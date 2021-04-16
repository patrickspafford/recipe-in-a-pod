import Link from 'next/link'
import { Button, Typography } from '@material-ui/core'
import { Layout } from '../components'
import colors from '../utils/colors'

const NotAuthorized = () => (
  <Layout title="Not Found">
    <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
      <div>
        <img src="/pea_people.png" width={680} height={279} alt="Pea people" />
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

export default NotAuthorized

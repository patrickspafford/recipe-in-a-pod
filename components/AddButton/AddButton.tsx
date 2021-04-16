import { IconButton } from '@material-ui/core'
import Link from 'next/link'
import { AddIcon } from '../../icons'
import styles from './AddButton.module.css'

const AddButton = () => (
  <Link href="/create">
    <a style={{ display: 'contents' }}>
      <IconButton className={styles.container}>
        <AddIcon size="inherit" />
      </IconButton>
    </a>
  </Link>
)

export default AddButton

import { IconButton } from '@material-ui/core'
import Link from 'next/link'
import { AddIcon } from '../../icons'
import useWindowSize from '../../hooks/useWindowSize'
import styles from './AddButton.module.css'
import colors from '../../utils/colors'

const AddButton = () => {
  const { isSmall } = useWindowSize()
  return (
    <Link href="/create">
      <a style={{ display: 'contents' }}>
        <IconButton
          className={isSmall ? styles.containerSmall : styles.container}
        >
          <AddIcon size="inherit" style={{ color: colors.primary }} />
        </IconButton>
      </a>
    </Link>
  )
}

export default AddButton

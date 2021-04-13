import { ReactNode } from 'react'
import { Paper } from '@material-ui/core'
import styles from './FormLayout.module.css'
import colors from '../../utils/colors'
import useWindowSize from '../../hooks/useWindowSize'

interface IFormLayout {
  children: ReactNode
}
const FormLayout = ({ children }: IFormLayout) => {
  const { isLarge } = useWindowSize()
  return (
    <div className={styles.container}>
      <Paper
        className={isLarge ? styles.paper : styles.paperSmall}
        style={{ backgroundColor: colors.primary }}
      >
        {children}
      </Paper>
    </div>
  )
}

export default FormLayout

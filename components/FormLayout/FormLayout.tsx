import { ReactNode } from 'react'
import { Paper } from '@material-ui/core'
import styles from './FormLayout.module.css'
import colors from '../../utils/colors'

interface IFormLayout {
    children: ReactNode
}
const FormLayout = ({ children }: IFormLayout) => (
  <div className={styles.container}>
    <Paper className={styles.paper} style={{ backgroundColor: colors.primary }}>
      {children}
    </Paper>
  </div>
)

export default FormLayout

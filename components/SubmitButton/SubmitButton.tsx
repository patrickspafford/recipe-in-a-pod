import { ReactNode } from 'react'
import { Button } from '@material-ui/core'
import styles from './SubmitButton.module.css'
import colors from '../../utils/colors'

interface ISubmitButton {
    disabled: boolean
    children: ReactNode
}

const SubmitButton = ({
  disabled,
  children,
}: ISubmitButton) => (
  <div className={styles.tableStyle}>
    <Button
      type="submit"
      disabled={disabled}
      size="large"
      className={styles.button}
      style={{ backgroundColor: colors.quinary }}
    >
      {children}
    </Button>
  </div>

)

export default SubmitButton

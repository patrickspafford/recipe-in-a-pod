import { ReactNode, CSSProperties } from 'react'
import { Button } from '@material-ui/core'
import styles from './SubmitButton.module.css'
import colors from '../../utils/colors'

interface ISubmitButton {
    disabled: boolean
    children: ReactNode
    style?: CSSProperties
    onClick?: any
}

const SubmitButton = ({
  disabled,
  children,
  style,
  onClick,
}: ISubmitButton) => (
  <div className={styles.tableStyle}>
    <Button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      size="large"
      className={styles.button}
      disableFocusRipple
      style={{ ...style, backgroundColor: colors.quinary }}
    >
      {children}
    </Button>
  </div>

)

SubmitButton.defaultProps = {
  style: {},
  onClick: () => console.log('No click function provided.'),
}

export default SubmitButton

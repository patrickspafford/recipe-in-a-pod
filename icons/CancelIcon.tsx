import { CSSProperties } from 'react'
import Icon from '@material-ui/icons/Cancel'
import colors from '../utils/colors'

interface ICancelIcon {
  style?: CSSProperties
  size?: 'small' | 'inherit' | 'default' | 'large'
}
const CancelIcon = ({ style, size }: ICancelIcon) => (
  <Icon fontSize={size} style={{ color: colors.white, ...style }} />
)

CancelIcon.defaultProps = {
  style: {},
  size: 'default',
}

export default CancelIcon

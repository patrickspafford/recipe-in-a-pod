import Icon from '@material-ui/icons/Lock'
import { CSSProperties } from 'react'
import colors from '../utils/colors'

interface IPrivateIcon {
  style?: CSSProperties
  size?: 'small' | 'inherit' | 'default' | 'large'
}
const PrivateIcon = ({ style, size }: IPrivateIcon) => (
  <Icon fontSize={size} style={{ color: colors.white, ...style }} />
)

PrivateIcon.defaultProps = {
  style: {},
  size: 'default',
}

export default PrivateIcon

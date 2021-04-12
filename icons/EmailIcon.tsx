import { CSSProperties } from 'react'
import Icon from '@material-ui/icons/Email'
import colors from '../utils/colors'

interface IEmailIcon {
  style?: CSSProperties
  size?: 'small' | 'inherit' | 'default' | 'large'
}
const EmailIcon = ({ style, size }: IEmailIcon) => (
  <Icon fontSize={size} style={{ color: colors.white, ...style }} />
)

EmailIcon.defaultProps = {
  style: {},
  size: 'default',
}

export default EmailIcon

import Icon from '@material-ui/icons/Public'
import { CSSProperties } from 'react'
import colors from '../utils/colors'

interface IPublicIcon {
  style?: CSSProperties
  size?: 'small' | 'inherit' | 'default' | 'large'
}
const PublicIcon = ({ style, size }: IPublicIcon) => (
  <Icon fontSize={size} style={{ color: colors.white, ...style }} />
)

PublicIcon.defaultProps = {
  style: {},
  size: 'default',
}

export default PublicIcon

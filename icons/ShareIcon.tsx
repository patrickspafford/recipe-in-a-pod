import { CSSProperties } from 'react'
import Icon from '@material-ui/icons/Share'
import colors from '../utils/colors'

interface IShareIcon {
  style?: CSSProperties
  size?: 'small' | 'inherit' | 'default' | 'large'
}
const ShareIcon = ({ style, size }: IShareIcon) => (
  <Icon fontSize={size} style={{ color: colors.black, ...style }} />
)

ShareIcon.defaultProps = {
  style: {},
  size: 'default',
}

export default ShareIcon

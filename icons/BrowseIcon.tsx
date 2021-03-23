import { CSSProperties } from 'react'
import Icon from '@material-ui/icons/Apps'
import colors from '../utils/colors'

interface IBrowseIcon {
  style?: CSSProperties
  size?: 'small' | 'inherit' | 'default' | 'large'
}
const BrowseIcon = ({ style, size }: IBrowseIcon) => (
  <Icon fontSize={size} style={{ color: colors.white, ...style }} />
)

BrowseIcon.defaultProps = {
  style: {},
  size: 'default',
}

export default BrowseIcon

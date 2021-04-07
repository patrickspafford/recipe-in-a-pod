import { CSSProperties } from 'react'
import Icon from '@material-ui/icons/Done'
import colors from '../utils/colors'

interface IDoneIcon {
  style?: CSSProperties
  size?: 'small' | 'inherit' | 'default' | 'large'
}
const DoneIcon = ({ style, size }: IDoneIcon) => (
  <Icon fontSize={size} style={{ color: colors.black, ...style }} />
)

DoneIcon.defaultProps = {
  style: {},
  size: 'default',
}

export default DoneIcon

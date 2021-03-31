import { CSSProperties } from 'react'
import Icon from '@material-ui/icons/People'
import colors from '../utils/colors'

interface IPeopleIcon {
  style?: CSSProperties
  size?: 'small' | 'inherit' | 'default' | 'large'
}
const PeopleIcon = ({ style, size }: IPeopleIcon) => (
  <Icon fontSize={size} style={{ color: colors.white, ...style }} />
)

PeopleIcon.defaultProps = {
  style: {},
  size: 'default',
}

export default PeopleIcon

import Icon from '@material-ui/icons/Restaurant'
import { CSSProperties } from 'react'
import colors from '../utils/colors'

interface IMealIcon {
  style?: CSSProperties
  size?: 'small' | 'inherit' | 'default' | 'large'
}
const MealIcon = ({ style, size }: IMealIcon) => (
  <Icon fontSize={size} style={{ color: colors.white, ...style }} />
)

MealIcon.defaultProps = {
  style: {},
  size: 'default',
}

export default MealIcon

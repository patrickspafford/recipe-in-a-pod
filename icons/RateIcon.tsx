import { CSSProperties } from 'react'
import Icon from '@material-ui/icons/Grade'
import colors from '../utils/colors'

interface IRateIcon {
  style?: CSSProperties
  size?: 'small' | 'inherit' | 'default' | 'large'
}
const RateIcon = ({ style, size }: IRateIcon) => (
  <Icon fontSize={size} style={{ color: colors.black, ...style }} />
)

RateIcon.defaultProps = {
  style: {},
  size: 'default',
}

export default RateIcon

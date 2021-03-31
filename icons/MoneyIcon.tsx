import { CSSProperties } from 'react'
import Icon from '@material-ui/icons/MonetizationOn'
import colors from '../utils/colors'

interface IMoneyIcon {
  style?: CSSProperties
  size?: 'small' | 'inherit' | 'default' | 'large'
}
const MoneyIcon = ({ style, size }: IMoneyIcon) => (
  <Icon fontSize={size} style={{ color: colors.white, ...style }} />
)

MoneyIcon.defaultProps = {
  style: {},
  size: 'default',
}

export default MoneyIcon

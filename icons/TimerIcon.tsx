import { CSSProperties } from 'react'
import Icon from '@material-ui/icons/Timer'
import colors from '../utils/colors'

interface ITimerIcon {
  style?: CSSProperties
  size?: 'small' | 'inherit' | 'default' | 'large'
}
const TimerIcon = ({ style, size }: ITimerIcon) => (
  <Icon fontSize={size} style={{ color: colors.white, ...style }} />
)

TimerIcon.defaultProps = {
  style: {},
  size: 'default',
}

export default TimerIcon

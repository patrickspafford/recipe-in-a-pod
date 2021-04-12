import { CSSProperties } from 'react'
import Icon from '@material-ui/icons/Face'
import colors from '../utils/colors'

interface IFaceIcon {
  style?: CSSProperties
  size?: 'small' | 'inherit' | 'default' | 'large'
}
const FaceIcon = ({ style, size }: IFaceIcon) => (
  <Icon fontSize={size} style={{ color: colors.white, ...style }} />
)

FaceIcon.defaultProps = {
  style: {},
  size: 'default',
}

export default FaceIcon

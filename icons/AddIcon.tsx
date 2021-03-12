import { CSSProperties } from 'react'
import Icon from '@material-ui/icons/AddCircleOutline'
import colors from '../utils/colors'

interface IAddIcon {
  style?: CSSProperties
  size?: 'small' | 'inherit' | 'default' | 'large'
}
const AddIcon = ({ style, size }: IAddIcon) => (
  <Icon fontSize={size} style={{ color: colors.white, ...style }} />
)

AddIcon.defaultProps = {
  style: {},
  size: 'default',
}

export default AddIcon

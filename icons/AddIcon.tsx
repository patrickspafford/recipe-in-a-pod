import { CSSProperties } from 'react'
import Icon from '@material-ui/icons/AddCircleOutline'
import colors from '../utils/colors'

interface IAddIcon {
  style?: CSSProperties
}
const AddIcon = ({ style }: IAddIcon) => (
  <Icon style={{ color: colors.white, ...style }} />
)

AddIcon.defaultProps = {
  style: {},
}

export default AddIcon

import Icon from '@material-ui/icons/HighlightOff'
import { CSSProperties } from 'react'
import colors from '../utils/colors'

interface IDeleteIcon {
  style?: CSSProperties
}
const DeleteIcon = ({ style }: IDeleteIcon) => (
  <Icon style={{ color: colors.white, ...style }} />
)

DeleteIcon.defaultProps = {
  style: {},
}

export default DeleteIcon

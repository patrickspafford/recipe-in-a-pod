import Icon from '@material-ui/icons/Delete'
import { CSSProperties } from 'react'
import colors from '../utils/colors'

interface ITrashIcon {
  style?: CSSProperties
}
const TrashIcon = ({ style }: ITrashIcon) => (
  <Icon style={{ color: colors.black, ...style }} />
)

TrashIcon.defaultProps = {
  style: {},
}

export default TrashIcon

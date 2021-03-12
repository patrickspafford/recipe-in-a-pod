import Icon from '@material-ui/icons/Edit'
import { CSSProperties } from 'react'
import colors from '../utils/colors'

interface IEditIcon {
  style?: CSSProperties
}
const EditIcon = ({ style }: IEditIcon) => (
  <Icon style={{ color: colors.black, ...style }} />
)

EditIcon.defaultProps = {
  style: {},
}

export default EditIcon

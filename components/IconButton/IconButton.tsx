import { IconButton as MuiIconButton } from '@material-ui/core'

const IconButton = ({ ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiIconButton style={{ color: 'white' }} {...props} />
)

export default IconButton

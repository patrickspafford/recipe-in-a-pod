import { AppBar as MuiAppBar } from '@material-ui/core'
import colors from '../../utils/colors'

const AppBar = ({ ...props }) => (
  <MuiAppBar
    style={{
      display: 'flex',
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
)

export default AppBar

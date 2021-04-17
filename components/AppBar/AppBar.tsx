import { AppBar as MuiAppBar } from '@material-ui/core'
import colors from '../../utils/colors'
import useWindowSize from '../../hooks/useWindowSize'

const AppBar = ({ ...props }) => {
  const { isTiny } = useWindowSize()
  return (
    <MuiAppBar
      style={{
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isTiny ? '0.25rem 1rem' : '0.5rem 3.5rem',
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default AppBar

import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

const StyledPaper = withStyles({
  root: {
    backgroundColor: 'transparent',
  },
})(Paper)

// eslint-disable-next-line react/prop-types
const DirectionsPaper = ({ children, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <StyledPaper {...props}>{children}</StyledPaper>
)

export default DirectionsPaper

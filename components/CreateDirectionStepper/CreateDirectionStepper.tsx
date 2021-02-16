import { Stepper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const StyledStepper = withStyles({
  root: {
    backgroundColor: 'transparent',
  },
})(Stepper)

// eslint-disable-next-line react/prop-types
const CreateDirectionStepper = ({ children, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <StyledStepper {...props}>{children}</StyledStepper>
)

export default CreateDirectionStepper

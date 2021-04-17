import { v4 as uuidv4 } from 'uuid'
import { Step, StepLabel, StepContent } from '@material-ui/core'
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles'
import {
  DirectionStepper,
  RecipeTextField,
  RecipeTextArea,
  IconButton,
} from '../../components'
import { AddIcon, DeleteIcon } from '../../icons'
import colors from '../../utils/colors'
import useWindowSize from '../../hooks/useWindowSize'
import { Instruction } from '../../types'

const useStyles = makeStyles(
  (myTheme: Theme) =>
    createStyles({
      root: {
        width: '50%',
        minWidth: '25rem',
        marginTop: '1rem',
        position: 'relative',
        height: '100%',
        backgroundColor: colors.primary,
        padding: '1rem',
        border: `1px solid ${colors.quinary}`,
        borderRadius: '2rem',
      },
      smallRoot: {
        width: '100%',
        minWidth: '25rem',
        marginTop: '3rem',
        position: 'relative',
        height: 'min-content',
        backgroundColor: colors.primary,
        padding: '2rem',
        border: `1px solid ${colors.quinary}`,
        borderRadius: '2rem',
      },
      tinyRoot: {
        width: '100%',
        minWidth: '18rem',
        marginTop: '3rem',
        position: 'relative',
        height: '100%',
        backgroundColor: colors.primary,
        padding: '2rem',
        border: `1px solid ${colors.quinary}`,
        borderRadius: '2rem',
      },
      button: {
        marginTop: myTheme.spacing(1),
        marginRight: myTheme.spacing(1),
      },
      actionsContainer: {
        marginBottom: myTheme.spacing(1),
      },
      resetContainer: {
        padding: myTheme.spacing(3),
      },
    }),
  // eslint-disable-next-line function-paren-newline
)

const theme = createMuiTheme({
  overrides: {
    MuiSvgIcon: {
      root: {
        fill: colors.quaternary,
      },
    },
  },
  palette: {
    primary: {
      main: colors.white,
    },
  },
})

const StyledStep = withStyles({
  root: {
    width: '100%',
  },
})(Step)

const uuids = new Array(101)
uuids.map(() => uuidv4())

interface IDirections {
  activeStep: number
  steps: Instruction[]
  setActiveStep: any
  editable?: boolean
  handleUpdateTexts?: any
  handleAddStepAtIndex?: any
  handleRemoveStepAtIndex?: any
}

export default function Directions({
  activeStep,
  steps,
  editable,
  setActiveStep,
  handleUpdateTexts,
  handleAddStepAtIndex,
  handleRemoveStepAtIndex,
}: IDirections) {
  const classes = useStyles()
  const { isLarge, isTiny } = useWindowSize()

  return (
    <ThemeProvider theme={theme}>
      <div
        className={
          // eslint-disable-next-line no-nested-ternary
          isLarge ? classes.root : isTiny ? classes.tinyRoot : classes.smallRoot
        }
      >
        <DirectionStepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <StyledStep key={uuids[index]}>
              <StepLabel onClick={() => setActiveStep(index)}>
                <RecipeTextField
                  onChange={(e) => {
                    if (editable) {
                      handleUpdateTexts('label', e, index)
                    }
                  }}
                  editable={editable}
                  error={step.error ? step.error.label : ''}
                  placeholder="Instruction Title"
                >
                  {step.label}
                </RecipeTextField>
              </StepLabel>
              <StepContent>
                <RecipeTextArea
                  editable={editable}
                  onChange={(e) => {
                    if (editable) {
                      handleUpdateTexts('details', e, index)
                    }
                  }}
                  error={step.error ? step.error.details : ''}
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque egestas diam in arcu cursus euismod quis viverra."
                >
                  {step.details}
                </RecipeTextArea>
                <div className={classes.actionsContainer}>
                  <div>
                    {steps.length <= 100 && editable && (
                      <IconButton
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddStepAtIndex(index)}
                        className={classes.button}
                      >
                        <AddIcon />
                      </IconButton>
                    )}
                    {steps.length > 1 && editable && (
                      <IconButton
                        onClick={() => handleRemoveStepAtIndex(index)}
                        className={classes.button}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </div>
                </div>
              </StepContent>
            </StyledStep>
          ))}
        </DirectionStepper>
      </div>
    </ThemeProvider>
  )
}

Directions.defaultProps = {
  editable: true,
  handleUpdateTexts: () => console.log('No update text function provided.'),
  handleAddStepAtIndex: () =>
    console.log('No add step at index func provided.'),
  handleRemoveStepAtIndex: () =>
    console.log('No remove step at index func provided'),
}

import { useState } from 'react'
import { Stepper, Step, StepLabel, StepContent, Button, Paper, Typography } from '@material-ui/core'
import { makeStyles, Theme, createStyles, withStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import colors from '../../utils/colors'

const useStyles = makeStyles((myTheme: Theme) =>
  createStyles({
    root: {
      width: '25rem',
      height: '100%',
      backgroundColor: 'transparent'
    },
    button: {
      marginTop: myTheme.spacing(1),
      marginRight: myTheme.spacing(1),
    },
    actionsContainer: {
      marginBottom: myTheme.spacing(2),
    },
    resetContainer: {
      padding: myTheme.spacing(3),
    },
  }),
);

const theme = createMuiTheme({
    overrides: {
        MuiSvgIcon: {
            root: {
                fill: colors.primary
            }
        }
    }
})

const StyledPaper = withStyles({
    root: {
        backgroundColor: 'transparent'
    }
})(Paper)

const StyledStepper = withStyles({
    root: {
        backgroundColor: 'transparent'
    }
})(Stepper)

const StyledStep = withStyles({
    root: {
    }
})(Step)

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <ThemeProvider theme={theme}>
        <div className={classes.root}>
        <StyledStepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
            <StyledStep key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                    <div>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                    >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                    </div>
                </div>
                </StepContent>
            </StyledStep>
            ))}
        </StyledStepper>
        {activeStep === steps.length && (
            <StyledPaper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} className={classes.button}>
                Reset
            </Button>
            </StyledPaper>
        )}
        </div>
    </ThemeProvider>
  );
}
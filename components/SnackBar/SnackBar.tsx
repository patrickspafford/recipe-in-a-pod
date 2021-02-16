import Snackbar from '@material-ui/core/Snackbar'
import { SyntheticEvent } from 'react'
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'

// eslint-disable-next-line react/jsx-props-no-spreading
const Alert = (props: AlertProps) => <MuiAlert elevation={6} variant="filled" {...props} />

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

interface ICustomizedSnackbar {
  open: boolean,
  setOpen: any
  message: string
  severity: Color
}

const CustomizedSnackbar = ({
  open, setOpen, message, severity,
}: ICustomizedSnackbar) => {
  const classes = useStyles()
  const handleClose = (e?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity || 'error'}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CustomizedSnackbar

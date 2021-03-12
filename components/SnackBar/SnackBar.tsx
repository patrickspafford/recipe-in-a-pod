import { Snackbar, SnackbarContent } from '@material-ui/core'
import { SyntheticEvent } from 'react'
import { Color } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

interface ICustomizedSnackbar {
  open: boolean
  setOpen: any
  message: string
  severity: Color
}

const CustomizedSnackbar = ({
  open,
  setOpen,
  message,
  severity,
}: ICustomizedSnackbar) => {
  const classes = useStyles()
  const handleClose = (e?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <SnackbarContent
          style={{ backgroundColor: severity === 'success' ? 'green' : 'red' }}
          message={message}
        />
      </Snackbar>
    </div>
  )
}

export default CustomizedSnackbar

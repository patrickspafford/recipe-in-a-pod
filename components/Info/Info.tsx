import { TextField, ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { Duration, TextFieldChange } from '../../types'
import styles from './Info.module.css'
import colors from '../../utils/colors'

const theme = createMuiTheme({
  overrides: {
    MuiSvgIcon: {
      root: {
        fill: colors.primary,
      },
    },
  },
  palette: {
    primary: {
      main: colors.white,
    },
  },
})

interface IInfo {
  price: number
  editable?: boolean
  prepTime: Duration
  priceError?: string
  hoursError?: string
  minutesError?: string
  serves: number
  servesError?: string
  // eslint-disable-next-line no-unused-vars
  onPriceChange?: (event: TextFieldChange) => void
  // eslint-disable-next-line no-unused-vars
  onHoursChange?: (event: TextFieldChange) => void
  // eslint-disable-next-line no-unused-vars
  onMinutesChange?: (event: TextFieldChange) => void
  // eslint-disable-next-line no-unused-vars
  onServesChange?: (event: TextFieldChange) => void
}
const Info = ({
  onPriceChange,
  onHoursChange,
  onMinutesChange,
  onServesChange,
  price,
  serves,
  servesError,
  prepTime,
  priceError,
  hoursError,
  minutesError,
  editable,
}: IInfo) => (
  <ThemeProvider theme={theme}>
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <TextField
          variant="standard"
          label="Total Cost"
          type="number"
          InputProps={{
            disableUnderline: true,
          }}
          InputLabelProps={{
            style: {
              color: colors.primary,
            },
          }}
          error={priceError.length > 0}
          helperText={priceError}
          className={styles.textField}
          value={price}
          fullWidth
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            className: styles.input,
            min: 0,
            max: 1000000,
            readOnly: !editable,
          }}
          onChange={(e) => {
            if (editable) {
              onPriceChange(e)
            }
          }}
        />
      </div>
      <div className={styles.innerContainer}>
        <TextField
          variant="standard"
          label="Hours"
          type="number"
          InputProps={{
            disableUnderline: true,
          }}
          InputLabelProps={{
            style: {
              color: colors.primary,
            },
          }}
          error={hoursError.length > 0}
          helperText={hoursError}
          className={styles.textField}
          value={prepTime.hours}
          fullWidth
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            className: styles.input,
            min: 0,
            max: 10000,
            readOnly: !editable,
          }}
          onChange={(e) => {
            if (editable) {
              onHoursChange(e)
            }
          }}
        />
      </div>
      <div className={styles.innerContainer}>
        <TextField
          type="number"
          variant="standard"
          label="Minutes"
          InputProps={{
            disableUnderline: true,
          }}
          InputLabelProps={{
            style: {
              color: colors.primary,
            },
          }}
          error={minutesError.length > 0}
          helperText={minutesError}
          className={styles.textField}
          value={prepTime.minutes}
          fullWidth
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            className: styles.input,
            min: 0,
            max: 59,
            readOnly: !editable,
          }}
          onChange={(e) => {
            if (editable) {
              onMinutesChange(e)
            }
          }}
        />
      </div>
      <div className={styles.innerContainer}>
        <TextField
          type="number"
          variant="standard"
          label="Serves"
          InputProps={{
            disableUnderline: true,
          }}
          InputLabelProps={{
            style: {
              color: colors.primary,
            },
          }}
          error={servesError.length > 0}
          helperText={servesError}
          className={styles.textField}
          value={serves}
          fullWidth
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            className: styles.input,
            min: 1,
            max: 100,
            readOnly: !editable,
          }}
          onChange={(e) => {
            if (editable) {
              onServesChange(e)
            }
          }}
        />
      </div>
    </div>
  </ThemeProvider>
)

Info.defaultProps = {
  editable: true,
  priceError: '',
  hoursError: '',
  minutesError: '',
  servesError: '',
  onPriceChange: () => console.log('No price change function provided'),
  onHoursChange: () => console.log('No hours change function provided'),
  onMinutesChange: () => console.log('No minutes change function provided'),
  onServesChange: () => console.log('No serves change function provided.'),
}

export default Info

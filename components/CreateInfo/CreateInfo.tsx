import { TextField, ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { ChangeEvent } from 'react'
import { Duration } from '../../types'
import useWindowSize from '../../hooks/useWindowSize'
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

interface ICreateRecipeTitle {
    price: number
    prepTime: Duration
    priceError: string
    hoursError: string
    minutesError: string
    // eslint-disable-next-line no-unused-vars
    onPriceChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    // eslint-disable-next-line no-unused-vars
    onHoursChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    // eslint-disable-next-line no-unused-vars
    onMinutesChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
const CreateRecipeTitle = ({
  onPriceChange,
  onHoursChange,
  onMinutesChange,
  price,
  prepTime,
  priceError,
  hoursError,
  minutesError,
}: ICreateRecipeTitle) => (
  <ThemeProvider theme={theme}>
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: '2rem',
      padding: '1rem',
      marginTop: '1rem',
      alignItems: 'center',
      border: `1px solid ${colors.quinary}`,
      width: '100%',
      backgroundColor: colors.primary,
    }}
    >
      <div style={{
        display: 'flex',
        zIndex: 4,
        width: '30%',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: '2rem',
        padding: '1rem',
        border: `1px solid ${colors.quinary}`,
      }}
      >
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
          style={{
            marginLeft: '1rem',
            padding: '0.2rem',
          }}
          value={price}
          fullWidth
      // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            style: {
              color: colors.primary,
              lineHeight: '3rem',
              paddingLeft: '2rem',
              fontSize: '2rem',
            },
            min: 0,
            max: 1000000,
          }}
          onChange={onPriceChange}
        />
      </div>
      <div style={{
        display: 'flex',
        zIndex: 4,
        width: '30%',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: '2rem',
        padding: '1rem',
        border: `1px solid ${colors.quinary}`,
      }}
      >
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
          style={{
            marginLeft: '1rem',
            padding: '0.2rem',
          }}
          value={prepTime.hours}
          fullWidth
      // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            style: {
              color: colors.primary,
              lineHeight: '3rem',
              paddingLeft: '2rem',
              fontSize: '2rem',
            },
            min: 0,
            max: 10000,
          }}
          onChange={onHoursChange}
        />
      </div>
      <div style={{
        display: 'flex',
        zIndex: 4,
        width: '30%',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: '2rem',
        padding: '1rem',
        border: `1px solid ${colors.quinary}`,
      }}
      >
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
          style={{
            marginLeft: '1rem',
            padding: '0.2rem',
          }}
          value={prepTime.minutes}
          fullWidth
      // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            style: {
              color: colors.primary,
              lineHeight: '3rem',
              paddingLeft: '2rem',
              fontSize: '2rem',
            },
            min: 0,
            max: 59,
          }}
          onChange={onMinutesChange}
        />
      </div>
    </div>
  </ThemeProvider>
)

export default CreateRecipeTitle

import { TextField, ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { ChangeEvent } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import colors from '../../utils/colors'

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

interface ICreateRecipeTitle {
    children: string
    error: string
    // eslint-disable-next-line no-unused-vars
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
const CreateRecipeTitle = ({
  onChange,
  children,
  error,
}: ICreateRecipeTitle) => {
  const { windowSize } = useWindowSize()
  return (
    <ThemeProvider theme={theme}>
      <div style={{
        display: 'flex',
        zIndex: 4,
        width: windowSize >= 800 ? '50%' : '100%',
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: '1rem',
        padding: '1rem',
        marginBottom: '1rem',
        border: `1px solid ${colors.quinary}`,
      }}
      >
        <TextField
          variant="standard"
          label="Recipe Name"
          InputLabelProps={{
            style: {
              color: colors.white,
            },
          }}
          error={error.length > 0}
          helperText={error}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem',
          }}
          value={children}
          multiline
          fullWidth
      // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            style: {
              color: colors.white,
              lineHeight: '3rem',
              paddingLeft: '2rem',
              fontSize: '2rem',
            },
          }}
          onChange={onChange}
        />
      </div>
    </ThemeProvider>
  )
}

export default CreateRecipeTitle

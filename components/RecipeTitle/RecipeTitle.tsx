import { TextField, ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { ChangeEvent } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import colors from '../../utils/colors'
import styles from './RecipeTitle.module.css'

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

interface IRecipeTitle {
  children: string
  error?: string
  editable?: boolean
  autoFocus?: boolean
  // eslint-disable-next-line no-unused-vars
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
}
const RecipeTitle = ({
  onChange,
  children,
  editable,
  error,
  autoFocus,
}: IRecipeTitle) => {
  const { isLarge } = useWindowSize()
  return (
    <ThemeProvider theme={theme}>
      <div className={isLarge ? styles.containerLarge : styles.containerSmall}>
        <TextField
          variant="standard"
          label="Recipe Name"
          autoFocus={autoFocus}
          InputLabelProps={{
            style: {
              color: colors.white,
            },
          }}
          error={error.length > 0}
          helperText={error}
          className={styles.textField}
          value={children}
          multiline
          fullWidth
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            className: styles.input,
            readOnly: !editable,
          }}
          onChange={onChange}
        />
      </div>
    </ThemeProvider>
  )
}

RecipeTitle.defaultProps = {
  onChange: () => console.log('No change function provided.'),
  editable: true,
  error: '',
  autoFocus: false,
}

export default RecipeTitle

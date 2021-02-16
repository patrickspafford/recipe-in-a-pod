import { TextField } from '@material-ui/core'
import { Ref, ChangeEvent } from 'react'
import colors from '../../utils/colors'

interface IRecipeTextArea {
    inputRef?: Ref<HTMLInputElement>
    children: string
    placeholder: string
    error: string
    // eslint-disable-next-line no-unused-vars
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
const RecipeTextArea = ({
  inputRef, onChange, children, placeholder, error,
}: IRecipeTextArea) => (
  <TextField
    variant="standard"
    style={{
      marginLeft: '1rem',
      padding: '1rem',
    }}
    error={error && error.length > 0}
    helperText={error}
    value={children}
    multiline
    fullWidth
    placeholder={placeholder}
    InputProps={{
      disableUnderline: true,
    }}
    inputProps={{
      style: {
        color: colors.white,
        lineHeight: '2rem',
      },
    }}
    inputRef={inputRef}
    onChange={onChange}
  />
)

RecipeTextArea.defaultProps = {
  inputRef: null,
}

export default RecipeTextArea

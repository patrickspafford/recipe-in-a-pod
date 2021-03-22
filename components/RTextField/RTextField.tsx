import { TextField } from '@material-ui/core'
import { Ref, CSSProperties } from 'react'
import { TextFieldChange } from '../../types'

interface IRecipeTextField {
  inputRef?: Ref<HTMLInputElement>
  children: string
  error: string
  placeholder: string
  textFieldStyle?: CSSProperties
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: TextFieldChange) => void
  inputStyle?: any
  variant?: 'standard' | 'filled' | 'outlined'
}
const RecipeTextField = ({
  inputRef,
  onChange,
  children,
  placeholder,
  error,
  textFieldStyle,
  variant,
  inputStyle,
}: IRecipeTextField) => (
  <TextField
    style={textFieldStyle}
    inputProps={{
      style: inputStyle,
    }}
    error={error && error.length > 0}
    helperText={error}
    multiline
    variant={variant}
    placeholder={placeholder}
    fullWidth
    value={children}
    inputRef={inputRef}
    onChange={onChange}
  />
)

RecipeTextField.defaultProps = {
  inputRef: null,
  textFieldStyle: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
  inputStyle: {},
  variant: 'standard',
}

export default RecipeTextField

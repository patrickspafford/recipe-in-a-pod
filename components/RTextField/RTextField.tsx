import { TextField } from '@material-ui/core'
import { Ref, ChangeEvent, CSSProperties } from 'react'

interface IRecipeTextField {
    inputRef?: Ref<HTMLInputElement>
    children: string
    error: string
    placeholder: string
    textFieldStyle: CSSProperties
    // eslint-disable-next-line no-unused-vars
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    inputStyle: any
    variant: 'standard' | 'filled' | 'outlined'
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
}

export default RecipeTextField

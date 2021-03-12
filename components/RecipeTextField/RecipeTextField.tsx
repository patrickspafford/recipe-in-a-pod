import { TextField } from '@material-ui/core'
import { Ref } from 'react'
import styles from './RecipeTextField.module.css'
import { TextFieldChange } from '../../types'

interface IRecipeTextField {
  inputRef?: Ref<HTMLInputElement>
  children: string
  editable?: boolean
  error?: string
  placeholder?: string
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: TextFieldChange) => void
}
const RecipeTextField = ({
  inputRef,
  onChange,
  children,
  editable,
  placeholder,
  error,
}: IRecipeTextField) => (
  <TextField
    className={styles.textField}
    inputProps={{
      className: styles.input,
      readOnly: !editable,
    }}
    error={error && error.length > 0}
    helperText={error}
    multiline
    variant="standard"
    placeholder={placeholder}
    fullWidth
    value={children}
    inputRef={inputRef}
    onChange={(e) => {
      if (editable) {
        onChange(e)
      }
    }}
  />
)

RecipeTextField.defaultProps = {
  editable: true,
  inputRef: null,
  onChange: () => console.log('No change func provided.'),
  error: '',
  placeholder: '',
}

export default RecipeTextField

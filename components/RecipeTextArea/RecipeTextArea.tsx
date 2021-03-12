import { TextField } from '@material-ui/core'
import { Ref } from 'react'
import { TextFieldChange } from '../../types'
import styles from './RecipeTextArea.module.css'

interface IRecipeTextArea {
  inputRef?: Ref<HTMLInputElement>
  children: string
  editable?: boolean
  placeholder?: string
  error?: string
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: TextFieldChange) => void
}
const RecipeTextArea = ({
  inputRef,
  onChange,
  children,
  placeholder,
  error,
  editable,
}: IRecipeTextArea) => (
  <TextField
    variant="standard"
    className={styles.textField}
    error={error && error.length > 0}
    helperText={error}
    value={children}
    multiline
    fullWidth
    placeholder={placeholder}
    InputProps={{ disableUnderline: true }}
    // eslint-disable-next-line react/jsx-no-duplicate-props
    inputProps={{
      className: styles.input,
      readOnly: !editable,
    }}
    inputRef={inputRef}
    onChange={(e) => {
      if (editable) {
        onChange(e)
      }
    }}
  />
)

RecipeTextArea.defaultProps = {
  inputRef: null,
  editable: true,
  placeholder: '',
  error: '',
  onChange: () => console.log('No change func provided'),
}

export default RecipeTextArea

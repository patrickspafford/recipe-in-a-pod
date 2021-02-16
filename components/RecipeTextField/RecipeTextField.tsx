import { TextField } from '@material-ui/core'
import { Ref, ChangeEvent } from 'react'
import styles from './RecipeTextField.module.css'
import colors from '../../utils/colors'

interface IRecipeTextField {
    inputRef?: Ref<HTMLInputElement>
    children: string
    error: string
    placeholder: string
    // eslint-disable-next-line no-unused-vars
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
const RecipeTextField = ({
  inputRef, onChange, children, placeholder, error,
}: IRecipeTextField) => (
  <TextField
    style={{ maxWidth: '20rem', marginLeft: '1rem' }}
    inputProps={{
      style: {
        fontSize: '1.7rem',
        color: colors.white,
        lineHeight: '2.5rem',
      },
    }}
    error={error && error.length > 0}
    helperText={error}
    multiline
    variant="standard"
    placeholder={placeholder}
    fullWidth
    value={children}
    inputRef={inputRef}
    onChange={onChange}
  />
)

export default RecipeTextField

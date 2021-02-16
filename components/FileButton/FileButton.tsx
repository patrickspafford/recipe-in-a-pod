/* eslint-disable jsx-a11y/label-has-associated-control */
import { Ref } from 'react'
import styles from './FileButton.module.css'

interface IFileButton {
  inputRef: Ref<HTMLInputElement> | null
  setImage: any
}

const FileButton = ({ inputRef, setImage }: IFileButton) => (
  <form className={styles.fileForm}>
    <input
      id="file-submit"
      type="file"
      ref={inputRef}
      accept="image/jpeg, image/png"
      hidden
      onChange={setImage}
    />
    <label
      className={styles.fileSubmitLabel}
      id="file-submit-label"
      htmlFor="file-submit"
    >
      Choose Photo

    </label>
  </form>
)

export default FileButton

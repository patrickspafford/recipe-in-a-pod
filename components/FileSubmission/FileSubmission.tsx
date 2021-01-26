import { forwardRef, LegacyRef } from 'react'
import styles from './FileSubmission.module.css'

const FileSubmission = forwardRef((props, ref: LegacyRef<HTMLInputElement>) => (
  <input className={styles.input} type="file" ref={ref} accept="image/png, image/jpeg" />
))

export default FileSubmission

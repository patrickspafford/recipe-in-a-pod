import { LoadingIndicator } from '../../components'
import styles from './LoadingContent.module.css'

const LoadingContent = () => (
  <div className={styles.loading}>
    <LoadingIndicator size={160} />
  </div>
)

export default LoadingContent

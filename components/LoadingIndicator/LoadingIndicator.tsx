import { CircularProgress } from '@material-ui/core'

interface ILoadingIndicator {
  size?: number
}

// eslint-disable-next-line no-confusing-arrow
const LoadingIndicator = ({ size }: ILoadingIndicator) =>
  size ? <CircularProgress size={size} /> : <CircularProgress />

LoadingIndicator.defaultProps = {
  size: undefined,
}

export default LoadingIndicator

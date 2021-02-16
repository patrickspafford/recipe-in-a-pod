import { useState, useEffect } from 'react'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<number>(0)

  const setInitialWindowSize = () => setWindowSize(window.innerWidth)

  useEffect(() => {
    setInitialWindowSize()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => setWindowSize(window.innerWidth))
  }, [])

  return {
    windowSize,
  }
}

export default useWindowSize

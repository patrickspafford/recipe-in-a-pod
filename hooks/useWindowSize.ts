import { useState, useEffect } from 'react'

const smallScreenWidth = 1000

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
    isSmall: windowSize < smallScreenWidth,
    isLarge: !(windowSize < smallScreenWidth),
  }
}

export default useWindowSize

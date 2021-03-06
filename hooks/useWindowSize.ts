import { useState, useEffect } from 'react'

const smallScreenWidth = 1000
const tinyScreenWidth = 400

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
    isTiny: windowSize < tinyScreenWidth,
  }
}

export default useWindowSize

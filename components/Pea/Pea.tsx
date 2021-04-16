import { useState } from 'react'
import { PeaType } from '../../types'
import styles from './Pea.module.css'

interface IPea {
  title: string
  type: PeaType
  value: number | string
  allowHover?: boolean
}

const peaBarMax = {
  duration: 3,
  cost: 20,
  rating: 5,
}

// eslint-disable-next-line object-curly-newline
const Pea = ({ type, allowHover, title, value }: IPea) => {
  const [showText, setShowText] = useState<boolean>(false)

  const handleMouseEnter = () => {
    if (allowHover) {
      setShowText(true)
    }
  }

  const handleMouseLeave = () => {
    setShowText(false)
  }

  const adjustedBarWidth = () => {
    if (typeof value === 'number') {
      const max = peaBarMax[type]
      const adjustedValue = value > max ? max : value
      return Math.round((adjustedValue / max) * 312)
    }
    return 0
  }

  const stars = () => {
    let starString = ''
    for (let i = 0; i < Math.round(Number(value)); i += 1) {
      starString += '⭑'
    }
    return starString
  }

  const barColor = () => {
    if (typeof value === 'number') {
      const max = peaBarMax[type]
      const isRating = type === 'rating'
      const adjustedValue = value > max ? max : value
      const adjustedValuePercentage = (adjustedValue / max) * 100
      if (isRating) {
        if (adjustedValuePercentage <= 25) return 'red'
        if (adjustedValuePercentage <= 45) return 'orange'
        if (adjustedValuePercentage <= 65) return 'yellow'
        return 'green'
      }
      if (adjustedValuePercentage <= 35) return 'green'
      if (adjustedValuePercentage <= 60) return 'yellow'
      if (adjustedValuePercentage <= 85) return 'orange'
      return 'red'
    }
    return '#fff'
  }

  return (
    <div className={styles.peaContainer}>
      <div
        className={allowHover ? styles.pea : styles.peaStatic}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={
          showText ? styles.slideOutTextTransition : styles.slideOutText
        }
      >
        <p className={styles.innerText}>
          {type !== 'rating' ? title : stars()}
        </p>
        <div
          style={
            showText
              ? {
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  backgroundColor: barColor(),
                  width: `${adjustedBarWidth()}px`,
                  zIndex: -4,
                  transition: '0.8s ease-in-out width',
                }
              : {
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  zIndex: -4,
                  backgroundColor: barColor(),
                  width: 0,
                }
          }
        />
      </span>
    </div>
  )
}

Pea.defaultProps = {
  allowHover: true,
}

export default Pea

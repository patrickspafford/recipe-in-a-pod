import { useState } from 'react'
import colors from '../../utils/colors'
import { PeaType } from '../../types'
import styles from './Pea.module.css'

interface IPea {
  title: string
  type: PeaType
  value: number | string
  barColor?: string
  allowHover?: boolean
}

const peaBarMax = {
  duration: 3,
  cost: 30,
  rating: 5,
}

const Pea = ({ type, allowHover, barColor, title, value }: IPea) => {
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
        <p className={styles.innerText}>{title}</p>
        <div
          style={
            showText
              ? {
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  backgroundColor: barColor,
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
                  backgroundColor: barColor,
                  width: 0,
                }
          }
        />
      </span>
    </div>
  )
}

Pea.defaultProps = {
  barColor: '#77ffbb',
  allowHover: true,
}

export default Pea

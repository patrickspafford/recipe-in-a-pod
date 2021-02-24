import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Pea from '../Pea'
import styles from './Pod.module.css'
import { PodType } from '../../types'

interface IPod {
  pod: PodType
}

const Pod = ({ pod }: IPod) => {
  const [rotated, setRotated] = useState(true)

  useEffect(() => {
    setTimeout(() => setRotated(false), 1000)
  }, [])

  return (
    <Link href="/recipes/1">
      <div className={styles.outerContainer}>
        <div
          className={rotated ? styles.podContainerRotated : styles.podContainer}
          style={{ zIndex: 3 }}
        >
          <Pea type="name" value={pod.name} title={pod.name} />
          <Pea
            type="duration"
            value={pod.duration.hours + pod.duration.minutes / 60}
            title={`${pod.duration.hours} HR ${pod.duration.minutes} MIN`}
          />
          <Pea type="cost" value={pod.price} title={`$${pod.price}`} />
          <Pea type="rating" value={3} title={`${3}`} />
        </div>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={pod.photoLink}
            height={320}
            width={320}
          />
        </div>
      </div>
    </Link>
  )
}

export default Pod

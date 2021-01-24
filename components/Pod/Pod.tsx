import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Pea from '../Pea'
import styles from './Pod.module.css'
import { PeaType } from '../../types'

const peaTitles: string[] = [
  'shrimp noodle bowl',
  '1 hr',
  '$12000',
  '4.5',
]

interface IPeas {
    title: string
    type: PeaType,
    value: number,
    color: string
}
const peas: IPeas[] = [
  {
    title: 'shrimp noodle bowl',
    type: 'name',
    value: 0,
    color: 'white',
  },
  {
    title: '1 hr',
    type: 'duration',
    value: 1.2,
    color: 'orange',
  },
  {
    title: '$20',
    type: 'cost',
    value: 20,
    color: '#ffec73',
  },
  {
    title: '4.5',
    type: 'rating',
    value: 4.5,
    color: 'green',
  },
]

const Pod = ({ imageSrc }) => {
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
          {peas.map((pea) => (
            <Pea
              key={pea.title}
              allowHover={!rotated}
              title={pea.title}
              value={pea.value}
              type={pea.type}
              barColor={pea.color}
            />
          ))}
        </div>
        <div className={styles.imageContainer}>
          <Image className={styles.image} src="/shrimp.jpg" height={320} width={320} />
        </div>
      </div>
    </Link>
  )
}

export default Pod

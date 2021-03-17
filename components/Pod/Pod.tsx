import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Pea from '../Pea'
import styles from './Pod.module.css'
import { PodType } from '../../types'
import { ContextMenu } from '../../components'

interface IPod {
  pod: PodType
  onEdit: any
  onDelete: any
}

const Pod = ({ pod, onDelete, onEdit }: IPod) => {
  const [rotated, setRotated] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const rotateTimeout = setTimeout(() => setRotated(false), 1000)
    return () => {
      clearTimeout(rotateTimeout)
    }
  }, [])

  return (
    <ContextMenu
      className={styles.outerContainer}
      onDelete={onDelete}
      onEdit={onEdit}
    >
      <Link href={`/recipes/${pod.docId}/${pod.name}`}>
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
      </Link>
      <Link>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={pod.photoLink}
            height={320}
            width={320}
          />
        </div>
      </Link>
    </ContextMenu>
  )
}

export default Pod

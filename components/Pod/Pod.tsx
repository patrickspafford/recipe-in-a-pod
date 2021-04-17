import { useEffect, useState } from 'react'
import Link from 'next/link'
import Pea from '../Pea'
import styles from './Pod.module.css'
import { PodType } from '../../types'
import { ContextMenu } from '../../components'
import useWindowSize from '../../hooks/useWindowSize'

interface IPod {
  pod: PodType
  canModify?: boolean
  onEdit?: any
  onDelete?: any
  onRate?: any
  onShare?: any
  showRate?: boolean
}

const Pod = ({
  pod,
  onDelete,
  onEdit,
  canModify,
  onRate,
  onShare,
  showRate,
}: IPod) => {
  const [rotated, setRotated] = useState(true)
  const { isSmall } = useWindowSize()

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
      onRate={onRate}
      showRate={showRate}
      onShare={onShare}
      isPublicType={!canModify}
    >
      <Link href={`/recipes/${pod.docId}/${pod.name}`}>
        <a style={{ zIndex: 4 }}>
          <div
            className={
              rotated ? styles.podContainerRotated : styles.podContainer
            }
            style={{ zIndex: 3 }}
          >
            <Pea
              type="name"
              value={pod.name}
              title={pod.name}
              allowHover={!rotated}
            />
            <Pea
              type="duration"
              value={pod.duration.hours + pod.duration.minutes / 60}
              title={`${pod.duration.hours} HR ${pod.duration.minutes} MIN`}
              allowHover={!rotated}
            />
            <Pea
              type="cost"
              value={pod.price}
              title={`$${pod.price}`}
              allowHover={!rotated}
            />
            <Pea
              type="rating"
              value={pod.rating || 2}
              title={`${pod.rating || 2}`}
              allowHover={!rotated}
            />
          </div>
        </a>
      </Link>
      <Link href={`/recipes/${pod.docId}/${pod.name}`}>
        <a>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={pod.photoLink}
              height={320}
              width={isSmall ? 300 : 320}
              alt={pod.name}
            />
          </div>
        </a>
      </Link>
    </ContextMenu>
  )
}

Pod.defaultProps = {
  canModify: true,
  onRate: () => console.log('Cannot rate this pod.'),
  onShare: () => console.log('Cannot share this pod.'),
  onEdit: () => console.log('Cannot edit this pod.'),
  onDelete: () => console.log('Cannot delete this pod.'),
  showRate: true,
}

export default Pod

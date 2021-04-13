import { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@material-ui/core'
import styles from './FormExtra.module.css'
import colors from '../../utils/colors'
import useWindowSize from '../../hooks/useWindowSize'

interface IFormExtra {
  children: ReactNode
  href: string
  buttonText: string
}

const FormExtra = ({ children, buttonText, href }: IFormExtra) => {
  const { isLarge } = useWindowSize()

  return (
    <div className={isLarge ? styles.tableStyle : styles.smallTableStyle}>
      <span>{children}</span>
      <Link href={href}>
        <Button
          className={styles.button}
          disableFocusRipple
          style={{ backgroundColor: colors.quinary }}
          size="small"
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  )
}

export default FormExtra

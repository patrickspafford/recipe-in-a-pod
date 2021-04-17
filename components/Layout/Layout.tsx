import { ReactNode, useState, MouseEvent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  AppBar,
  Typography,
  ProfileMenu,
  IconButton,
  Drawer,
} from '../../components'
import useWindowSize from '../../hooks/useWindowSize'
import useUser from '../../hooks/useUser'
import styles from './Layout.module.css'

interface ILayout {
  children: ReactNode
  title: string
  hideLogInOut?: boolean
}

const Layout = ({ children, title, hideLogInOut }: ILayout) => {
  const { user, loggedIn, logout } = useUser()
  const router = useRouter()
  const { isSmall } = useWindowSize()
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLButtonElement>(null)
  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) =>
    setMenuAnchor(e.currentTarget)
  const handleMenuClose = () => setMenuAnchor(null)

  const handleLogInOut = () => (loggedIn ? logout() : router.push('/login'))

  return (
    <>
      <Head>
        <title>{title ? `${title} | Recipe Pods` : 'Recipe Pods'}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppBar position="sticky">
        <Link href="/">
          <a style={{ float: 'left' }}>
            <div className={styles.imageContainer}>
              {!isSmall && <Typography variant="h6">Recipe</Typography>}
              <img
                className={styles.image}
                src="/pea_people.png"
                alt="Site logo"
                height={60}
                width={136}
              />
              {!isSmall && <Typography variant="h6">Pods</Typography>}
            </div>
          </a>
        </Link>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {!hideLogInOut ? (
            <ProfileMenu
              anchor={menuAnchor}
              imageSrc={user ? user.profilePhotoLink : ''}
              isLoggedIn={loggedIn}
              username={user ? user.username : ''}
              handleClose={handleMenuClose}
              handleClick={handleMenuClick}
              handleLogInOut={handleLogInOut}
            />
          ) : (
            <Typography variant="h6" />
          )}
          {loggedIn ? <Drawer /> : <IconButton />}
        </div>
      </AppBar>
      <div className={styles.childrenContainer}>{children}</div>
    </>
  )
}

Layout.defaultProps = {
  hideLogInOut: false,
}

export default Layout

import {
  ReactNode, useState, MouseEvent,
} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import MenuIcon from '@material-ui/icons/Menu'
import { useRouter } from 'next/router'
import {
  AppBar, Typography, ProfileMenu, IconButton,
} from '../../components'

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
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLButtonElement>(null)
  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => setMenuAnchor(e.currentTarget)
  const handleMenuClose = () => setMenuAnchor(null)

  const handleLogInOut = () => (loggedIn ? logout() : router.push('/login'))

  return (
    <>
      <Head>
        <title>{title ? `${title} | Recipe In a Pod` : 'Recipe In a Pod'}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppBar position="sticky">
        {
                loggedIn
                  ? (
                    <IconButton>
                      <MenuIcon />
                    </IconButton>
                  )
                  : <IconButton />
            }
        <div className={styles.imageContainer}>
          <Typography variant="h6">Recipe</Typography>
          <Image src="/pods.svg" alt="Site logo" height={55} width={55} />
          <Typography variant="h6">Pods</Typography>
        </div>
        {!hideLogInOut ? (
          <ProfileMenu
            anchor={menuAnchor}
            imageSrc={user.profilePhotoLink}
            isLoggedIn={loggedIn}
            username={user.username}
            handleClose={handleMenuClose}
            handleClick={handleMenuClick}
            handleLogInOut={handleLogInOut}
          />
        ) : <Typography variant="h6" />}
      </AppBar>
      <div className={styles.childrenContainer}>
        {children}
      </div>
    </>
  )
}

Layout.defaultProps = {
  hideLogInOut: false,
}

export default Layout

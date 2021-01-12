import {
  ReactNode, useState, useContext, MouseEvent,
} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { AppBar, Typography, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { ProfileMenu } from '../../components'
import { useAuth } from '../../hooks/useAuth'
import { ProfilePhotoContext } from '../../contexts/ProfilePhotoContext'
import colors from '../../utils/colors'
import styles from './Layout.module.css'

interface ILayout {
    children: ReactNode
    title: string
    hideLogInOut?: boolean
}

const StyledAppBar = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
})(AppBar)

const StyledTypography = withStyles({
  root: {
    color: 'white',
    padding: '0.5rem',
  },
})(Typography)

const StyledIconButton = withStyles({
  root: {
    color: 'white',
  },
})(IconButton)

const Layout = ({ children, title, hideLogInOut }: ILayout) => {
  const auth = useAuth()
  const router = useRouter()
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLButtonElement>(null)

  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => setMenuAnchor(e.currentTarget)

  const handleMenuClose = () => setMenuAnchor(null)

  const handleLogOut = () => {
    router.push('/login')
      .then(() => {
        console.log('Logged out successfully.')
        auth.logOut()
      })
      .catch((err) => console.error(err))
  }

  const handleLogInOut = () => {
    if (auth.loggedIn) {
      handleLogOut()
    } else {
      router.push('/login')
        .then(() => console.log('Routed to login page.'))
        .catch((e) => console.error(e))
    }
  }

  return (
    <>
      <Head>
        <title>{title ? `${title} | Recipe In a Pod` : 'Recipe In a Pod'}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <StyledAppBar position="sticky">
        {
                auth.loggedIn
                  ? (
                    <StyledIconButton>
                      <MenuIcon />
                    </StyledIconButton>
                  )
                  : <StyledIconButton />
            }
        <div className={styles.imageContainer}>
          <StyledTypography variant="h6">Recipe</StyledTypography>
          <Image src="/pods.svg" alt="Site logo" height={55} width={55} />
          <StyledTypography variant="h6">Pods</StyledTypography>
        </div>
        {!hideLogInOut ? (
          <ProfileMenu
            anchor={menuAnchor}
            imageSrc={auth.profilePhoto}
            isLoggedIn={auth.loggedIn}
            username={auth.username}
            handleClose={handleMenuClose}
            handleClick={handleMenuClick}
            handleLogInOut={handleLogInOut}
          />
        ) : <StyledTypography variant="h6" />}
      </StyledAppBar>
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

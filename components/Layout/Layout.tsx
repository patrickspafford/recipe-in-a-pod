import { ReactNode, useState, MouseEvent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AppBar, Typography, ProfileMenu } from '../../components'
import useWindowSize from '../../hooks/useWindowSize'
import useUser from '../../hooks/useUser'
import styles from './Layout.module.css'

interface ILayout {
  children: ReactNode
  title: string
  hideLogInOut?: boolean
  preview?: {
    image: string
    overrideTitle: string
    description?: string
  }
}

// eslint-disable-next-line object-curly-newline
const Layout = ({ children, title, hideLogInOut, preview }: ILayout) => {
  const { user, loggedIn, logout } = useUser()
  const router = useRouter()
  const { isSmall } = useWindowSize()
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLButtonElement>(null)
  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) =>
    setMenuAnchor(e.currentTarget)
  const handleMenuClose = () => setMenuAnchor(null)

  const handleLogInOut = () => (loggedIn ? logout() : router.push('/login'))

  const handleTitle = () => {
    if (preview === null) {
      return title ? `${title} | Recipe Pods` : 'Recipe Pods'
    }
    return `${preview.overrideTitle} | Recipe Pods`
  }

  return (
    <>
      <Head>
        <title>{handleTitle()}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {preview !== null && (
          <>
            <meta property="og:title" content={preview.overrideTitle} />
            <meta property="og:image" content={preview.image} />
            <meta property="og:description" content={preview.description} />
            <meta property="og:type" content="website" />
          </>
        )}
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
        </div>
      </AppBar>
      <div className={styles.childrenContainer}>{children}</div>
    </>
  )
}

Layout.defaultProps = {
  hideLogInOut: false,
  preview: null,
}

export default Layout

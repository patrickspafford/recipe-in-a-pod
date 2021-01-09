import React, { ReactNode } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { AppBar, Typography, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles'
import { useAuth, AuthProvider } from '../../hooks/useAuth'
import { CookiesProvider } from 'react-cookie'
import colors from '../../utils/colors'
import styles from './Layout.module.css'
import { useRouter } from 'next/router'

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
        backgroundColor: colors.primary
    }
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
    }
})(IconButton)

const Layout = ({ children, title, hideLogInOut }: ILayout) => {

    const auth = useAuth()
    const router = useRouter()

    const handleLogInOut = () => {
        if (auth.loggedIn) {
            handleLogOut()
        } else {
            router.push('/login')
            .then(() => console.log('Routed to login page.'))
            .catch(e => console.error(e))
        }
    }

    const handleLogOut = () => {
        router.push('/login')
            .then(() => {
                console.log('Logged out successfully.')
                auth.logOut()
            })
            .catch(err => console.error(err))
    }


    return (
    <>
        <Head>
            <title>{title ? `${title} | Recipe In a Pod` : `Recipe In a Pod`}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <StyledAppBar position='sticky'>
            {
                auth.loggedIn
                ? (<StyledIconButton>
                        <MenuIcon />
                    </StyledIconButton>)
                : <StyledIconButton />
            }
            <div className={styles.imageContainer}>
            <StyledTypography variant='h6'>Recipe</StyledTypography>
            <Image src='/pods.svg' alt='Site logo' height={50} width={50} />
            <StyledTypography variant='h6'>Pods</StyledTypography>
            </div>
            {
            !hideLogInOut ? (
                <StyledTypography variant='h6' onClick={handleLogInOut}>
                    {auth.loggedIn ? 'Log Out' : 'Log In'}
                </StyledTypography>
            ) : (<StyledTypography variant='h6' />)
            }
        </StyledAppBar>
        <div className={styles.childrenContainer}>
            {children}
        </div>
    </>
    )

}

export default Layout
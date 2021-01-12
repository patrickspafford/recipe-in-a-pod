import {
  IconButton, MenuItem, Menu,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import Image from 'next/image'
import Link from 'next/link'
import styles from './ProfileMenu.module.css'

interface IProfileMenu {
    anchor: null | HTMLElement,
    handleClose: any
    handleClick: any
    handleLogInOut: any
    isLoggedIn: boolean
    username: string
    imageSrc: string
}
const ProfileMenu = ({
  anchor, handleClose, handleClick, imageSrc, isLoggedIn, username, handleLogInOut,
}: IProfileMenu) => (
  <div>
    <IconButton aria-controls="recipe-menu" aria-haspopup="true" onClick={handleClick}>
      {isLoggedIn
        ? (<Image className={styles.profilePhoto} id="profile-photo" width={35} height={35} src={imageSrc || '/shrimp.jpg'} alt="Profile" />)
        : <AccountCircle fontSize="large" style={{ color: 'white' }} />}
    </IconButton>
    <Menu
      id="recipe-menu"
      anchorEl={anchor}
      keepMounted
      open={Boolean(anchor)}
      onClose={handleClose}
    >
      {isLoggedIn ? (
        <div>
          <Link href={`/profile/${username}`}>
            <MenuItem>
              {username}
            </MenuItem>
          </Link>
          <MenuItem onClick={handleLogInOut}>
            Log Out
          </MenuItem>
        </div>
      )
        : (
          <MenuItem onClick={handleLogInOut}>
            Log In
          </MenuItem>
        )}
    </Menu>
  </div>
)

export default ProfileMenu

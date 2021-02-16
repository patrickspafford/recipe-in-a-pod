import {
  IconButton, MenuItem, Menu, ListItemIcon, Tooltip,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'
import { AccountCircle } from '@material-ui/icons'
import Image from 'next/image'
import Link from 'next/link'
import styles from './ProfileMenu.module.css'

interface IProfileMenu {
  anchor: null | HTMLElement
  handleClose: any
  handleClick: any
  handleLogInOut: any
  isLoggedIn: boolean
  username: string
  imageSrc: string
}
const ProfileMenu = ({
  anchor,
  handleClose,
  handleClick,
  imageSrc,
  isLoggedIn,
  username,
  handleLogInOut,
}: IProfileMenu) => (
  <div>
    <Tooltip
      placement="bottom"
      title="Profile"
    >
      <IconButton
        aria-controls="recipe-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {isLoggedIn && imageSrc ? (
          <Image
            className={styles.profilePhoto}
            id="profile-photo"
            width={50}
            height={50}
            src={imageSrc}
            alt="Profile"
          />
        ) : (
          <AccountCircle fontSize="large" style={{ color: 'white' }} />
        )}
      </IconButton>
    </Tooltip>
    <Menu
      id="recipe-menu"
      anchorEl={anchor}
      keepMounted
      open={Boolean(anchor)}
      onClose={handleClose}
    >
      {isLoggedIn ? (
        <div>
          <Link href="/">
            <MenuItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              Home
            </MenuItem>
          </Link>
          <Link
            href={`/profile/${username}`}
          >
            <MenuItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              {username}
            </MenuItem>
          </Link>
          <MenuItem onClick={handleLogInOut}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            Log Out
          </MenuItem>
        </div>
      ) : (
        <MenuItem onClick={handleLogInOut}>Log In</MenuItem>
      )}
    </Menu>
  </div>
)

export default ProfileMenu

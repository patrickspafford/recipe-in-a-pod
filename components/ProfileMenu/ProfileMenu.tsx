import {
  IconButton,
  MenuItem,
  Menu,
  ListItemIcon,
  Tooltip,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import BrowseIcon from '@material-ui/icons/Apps'
import AddIcon from '@material-ui/icons/AddCircleOutline'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'
import { AccountCircle } from '@material-ui/icons'
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
    <Tooltip placement="bottom" title="Menu">
      <IconButton
        aria-controls="recipe-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {isLoggedIn && imageSrc ? (
          <img
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
          {/* <Link href="/">
            <a>
              <MenuItem>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                Home
              </MenuItem>
            </a>
      </Link> */}
          <Link href="/">
            <a>
              <MenuItem>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                Home
              </MenuItem>
            </a>
          </Link>
          <Link href="/create">
            <a>
              <MenuItem>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                Create
              </MenuItem>
            </a>
          </Link>
          <Link href="/browse">
            <a>
              <MenuItem>
                <ListItemIcon>
                  <BrowseIcon />
                </ListItemIcon>
                Browse
              </MenuItem>
            </a>
          </Link>
          <Link href={`/profile/${username}`}>
            <a>
              <MenuItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                {username}
              </MenuItem>
            </a>
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

import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
} from '@material-ui/core'
import { ReactNode } from 'react'
import Link from 'next/link'

interface IDrawer {
  children: string
  icon: ReactNode
  href: string
}

const DrawerItem = ({ children, icon, href }: IDrawer) => (
  <Link href={href}>
    <a>
      <Button style={{ display: 'block', width: '100%' }}>
        <ListItem style={{ paddingLeft: '32px', paddingRight: '32px' }}>
          <ListItemIcon style={{ minWidth: '32px' }}>
            <IconButton disableFocusRipple>{icon}</IconButton>
          </ListItemIcon>
          <ListItemText
            style={{ color: '#fff', paddingTop: '2px', textAlign: 'center' }}
          >
            {children}
          </ListItemText>
        </ListItem>
      </Button>
    </a>
  </Link>
)

export default DrawerItem

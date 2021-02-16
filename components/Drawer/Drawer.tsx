import {
  Drawer, List, IconButton, Tooltip,
} from '@material-ui/core'
import {
  useState, KeyboardEvent, MouseEvent,
} from 'react'
import { MenuIcon, HomeIcon, AddIcon } from '../../icons'
import { DrawerItem } from '../../components'
import colors from '../../utils/colors'

const TemporaryDrawer = () => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (openValue: boolean) => (
    event: KeyboardEvent | MouseEvent,
  ) => {
    if (
      event.type === 'keydown'
      && ((event as KeyboardEvent).key === 'Tab'
      || (event as KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setOpen(openValue)
  }

  return (
    <div>
      <Tooltip
        placement="bottom"
        title="Menu"
      >
        <IconButton
          onClick={toggleDrawer(true)}
          style={{ color: colors.white }}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          style: {
            backgroundColor: colors.primary,
          },
        }}
      >
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <DrawerItem
              href="/"
              icon={<HomeIcon />}
            >
              Home
            </DrawerItem>
            <DrawerItem
              icon={<AddIcon />}
              href="/create"
            >
              Create a Pod
            </DrawerItem>
          </List>
        </div>
      </Drawer>
    </div>
  )
}

export default TemporaryDrawer

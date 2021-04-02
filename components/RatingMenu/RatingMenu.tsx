import {
  MenuItem,
  Menu,
  ListItemIcon,
  ClickAwayListener,
  MenuList,
} from '@material-ui/core'
import { useEffect, useRef } from 'react'
import { RateIcon } from '../../icons'

interface IRatingMenu {
  anchor: null | HTMLElement
  handleClose: any
  handleClick: any
  onRate: any
}

const RatingMenu = ({
  anchor,
  handleClose,
  handleClick,
  onRate,
}: IRatingMenu) => {
  useEffect(() => {
    window.addEventListener('keydown', (ev: KeyboardEvent) => {
      if (ev.key === '5') {
        onRate(5)
      } else if (ev.key === '4') {
        onRate(4)
      } else if (ev.key === '3') {
        onRate(3)
      } else if (ev.key === '2') {
        onRate(2)
      } else if (ev.key === '1') {
        onRate(1)
      }
      handleClose()
    })
  }, [])

  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon>
        <RateIcon />
      </ListItemIcon>
      Rate
      <Menu
        id="recipe-rating-menu"
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        <ClickAwayListener onClickAway={() => handleClose()}>
          <MenuList>
            <MenuItem onClick={() => onRate(5)}>
              <ListItemIcon>
                <div style={{ display: 'flex' }}>
                  <RateIcon />
                  <RateIcon />
                  <RateIcon />
                  <RateIcon />
                  <RateIcon />
                </div>
              </ListItemIcon>
            </MenuItem>
            <MenuItem onClick={() => onRate(4)}>
              <ListItemIcon>
                <div style={{ display: 'flex' }}>
                  <RateIcon />
                  <RateIcon />
                  <RateIcon />
                  <RateIcon />
                </div>
              </ListItemIcon>
            </MenuItem>
            <MenuItem onClick={() => onRate(3)}>
              <ListItemIcon>
                <div style={{ display: 'flex' }}>
                  <RateIcon />
                  <RateIcon />
                  <RateIcon />
                </div>
              </ListItemIcon>
            </MenuItem>
            <MenuItem onClick={() => onRate(2)}>
              <ListItemIcon>
                <div style={{ display: 'flex' }}>
                  <RateIcon />
                  <RateIcon />
                </div>
              </ListItemIcon>
            </MenuItem>
            <MenuItem onClick={() => onRate(1)}>
              <ListItemIcon>
                <RateIcon />
              </ListItemIcon>
            </MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Menu>
    </MenuItem>
  )
}

export default RatingMenu

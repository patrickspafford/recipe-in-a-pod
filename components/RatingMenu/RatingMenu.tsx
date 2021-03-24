import { MenuItem, Menu, ListItemIcon, Typography } from '@material-ui/core'
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
}: IRatingMenu) => (
  <MenuItem onClick={handleClick}>
    <ListItemIcon>
      <RateIcon />
    </ListItemIcon>
    Rate
    <Menu
      id="recipe-rating-menu"
      anchorEl={anchor}
      keepMounted
      open={Boolean(anchor)}
      onClose={handleClose}
    >
      <div>
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
      </div>
    </Menu>
  </MenuItem>
)

export default RatingMenu

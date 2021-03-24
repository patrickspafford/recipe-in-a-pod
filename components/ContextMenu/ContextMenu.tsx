import { useState, MouseEvent, ReactNode } from 'react'
import { Menu, MenuItem, ListItemIcon } from '@material-ui/core'
import { TrashIcon, EditIcon, RateIcon, ShareIcon } from '../../icons'

const initialState = {
  mouseX: null,
  mouseY: null,
}

interface IContextMenu {
  children: ReactNode
  onEdit: any
  onDelete: any
  onRate?: any
  showRate: boolean
  onShare?: any
  className: any
  isPublicType: boolean
}

const ContextMenu = ({
  children,
  onEdit,
  onDelete,
  onRate,
  onShare,
  showRate,
  className,
  isPublicType,
}: IContextMenu) => {
  const [state, setState] = useState<{
    mouseX: null | number
    mouseY: null | number
  }>(initialState)

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    })
  }

  const handleClose = () => {
    setState(initialState)
  }

  const handleEdit = () => {
    onEdit()
    handleClose()
  }

  const handleDelete = () => {
    onDelete()
    handleClose()
  }

  const handleShare = () => {
    onShare()
    handleClose()
  }

  const handleRate = () => {
    onRate()
    handleClose()
  }

  return (
    <div className={className} onContextMenu={handleClick}>
      {children}
      <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        {isPublicType ? (
          <>
            {showRate ? (
              <MenuItem onClick={handleRate}>
                <ListItemIcon>
                  <RateIcon />
                </ListItemIcon>
                Rate
              </MenuItem>
            ) : null}
            <MenuItem onClick={handleShare}>
              <ListItemIcon>
                <ShareIcon />
              </ListItemIcon>
              Share
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleEdit}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <TrashIcon />
              </ListItemIcon>
              Delete
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  )
}

ContextMenu.defaultProps = {
  onRate: () => console.log('Cannot rate this pod.'),
  onShare: () => console.log('Cannot share this pod.'),
  showRate: true,
}

export default ContextMenu

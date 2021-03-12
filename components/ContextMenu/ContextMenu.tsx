import { useState, MouseEvent, ReactNode } from 'react'
import { Menu, MenuItem, ListItemIcon } from '@material-ui/core'
import { TrashIcon, EditIcon } from '../../icons'

const initialState = {
  mouseX: null,
  mouseY: null,
}

interface IContextMenu {
  children: ReactNode
  onEdit: any
  onDelete: any
  className: any
}

const ContextMenu = ({
  children,
  onEdit,
  onDelete,
  className,
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
      </Menu>
    </div>
  )
}

export default ContextMenu

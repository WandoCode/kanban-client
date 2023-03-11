import EllipsisMenu from '../../components/molecules/EllipsisMenu'
import { useAppDispatch, useAppSelector, RootState } from '../app.store'
import { toggleTaskMenu } from './menus.actions'

function TaskMenu() {
  const dispatch = useAppDispatch()

  const { taskMenuIsOpen } = useAppSelector((state: RootState) => state.menus)

  const menuItemsWithHandler = [
    {
      text: 'Edit Task',
      handler: () => {},
    },
    {
      text: 'Delete Task',
      handler: () => {},
    },
  ]

  return (
    <EllipsisMenu
      name="task"
      menuIsOpen={taskMenuIsOpen}
      toogleMenu={() => dispatch(toggleTaskMenu())}
      menuItemsWithHandler={menuItemsWithHandler}
    />
  )
}

export default TaskMenu

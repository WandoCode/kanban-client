import EllipsisMenu from '../../components/molecules/EllipsisMenu'
import { useAppDispatch, useAppSelector, RootState } from '../app.store'
import { toggleTaskMenu } from './menus.actions'
import { closeModalTaskDetails } from '../task-details/taskDetails.actions'
import { openTaskFormModal } from '../taskForm/taskForm.actions'

function TaskMenu() {
  const dispatch = useAppDispatch()

  const { taskMenuIsOpen } = useAppSelector((state: RootState) => state.menus)
  const { task } = useAppSelector((state: RootState) => state.taskDetails)

  const menuItemsWithHandler = [
    {
      text: 'Edit Task',
      handler: () => {
        dispatch(closeModalTaskDetails())
        dispatch(openTaskFormModal(true, task))
      },
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

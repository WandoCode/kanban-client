import EllipsisMenu from '../../components/molecules/EllipsisMenu'
import { useAppDispatch } from '../app.store'
import { toggleTaskMenu } from './menus.actions'
import { closeModalTaskDetails } from '../task-details/taskDetails.actions'
import { openTaskFormModal } from '../taskForm/taskForm.actions'
import useGetAppState from '../useGetAppState'

function TaskMenu() {
  const dispatch = useAppDispatch()

  const { taskMenuIsOpen, task } = useGetAppState()

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

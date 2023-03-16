import EllipsisMenu from '../../components/molecules/EllipsisMenu'
import { useAppDispatch } from '../app.store'
import { toggleTaskMenu } from './menus.actions'
import { closeModalTaskDetails } from '../task-details/taskDetails.actions'
import { openTaskFormModal } from '../taskForm/taskForm.actions'
import useGetAppState from '../useGetAppState'
import { openConfirmDelete } from '../confirm-delete/confirmDelete.actions'

function TaskMenu() {
  const dispatch = useAppDispatch()

  const { taskMenuIsOpen, task } = useGetAppState()

  const onDeleteTask = () => {
    dispatch(closeModalTaskDetails())
    dispatch(openConfirmDelete('task'))
  }

  const onEditTask = () => {
    dispatch(closeModalTaskDetails())
    dispatch(openTaskFormModal(true, task))
  }

  const menuItemsWithHandler = [
    {
      text: 'Edit Task',
      handler: onEditTask,
    },
    {
      text: 'Delete Task',
      handler: onDeleteTask,
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

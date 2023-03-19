import EllipsisMenu from '../../components/molecules/EllipsisMenu'
import { useAppDispatch, useAppSelector } from '../app.store'
import { toggleTaskMenu } from './menus.actions'
import { closeModalTaskDetails } from '../task-details/taskDetails.actions'
import { openTaskFormModal } from '../taskForm/taskForm.actions'
import { openConfirmDelete } from '../confirm-delete/confirmDelete.actions'

function TaskMenu() {
  const dispatch = useAppDispatch()
  const { taskMenuIsOpen } = useAppSelector((s) => s.menus)
  const { task } = useAppSelector((s) => s.taskDetails)

  const onDeleteTask = () => {
    closeModal()
    dispatch(openConfirmDelete('task'))
  }

  const onEditTask = () => {
    closeModal()
    dispatch(openTaskFormModal(true, task))
  }

  const closeModal = () => {
    dispatch(toggleTaskMenu())
    dispatch(closeModalTaskDetails())
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

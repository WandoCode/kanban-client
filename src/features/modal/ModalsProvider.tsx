import TaskDetailsModal from '../task-details/TaskDetailsModal'
import ModalTaskForm from '../taskForm/TaskFormModal'
import BoardFormModal from '../board-form/BoardFormModal'
import ConfirmDeleteModal from '../confirm-delete/ConfirmDeleteModal'
import { useAppSelector } from '../app.store'

const ModalsProvider = () => {
  const { boardFormModalIsOpen } = useAppSelector((s) => s.boardForm)
  const { taskDetailsModalIsOpen } = useAppSelector((s) => s.taskDetails)
  const { taskFormModalIsOpen } = useAppSelector((s) => s.taskForm)
  const { confirmDeleteIsOpen } = useAppSelector((s) => s.confirmDelete)

  return (
    <>
      {taskDetailsModalIsOpen && <TaskDetailsModal />}
      {taskFormModalIsOpen && <ModalTaskForm />}
      {boardFormModalIsOpen && <BoardFormModal />}
      {confirmDeleteIsOpen && <ConfirmDeleteModal />}
    </>
  )
}

export default ModalsProvider

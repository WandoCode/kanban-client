import useGetAppState from '../useGetAppState'
import TaskDetailsModal from '../task-details/TaskDetailsModal'
import ModalTaskForm from '../taskForm/TaskFormModal'
import BoardFormModal from '../board-form/BoardFormModal'
import ConfirmDeleteModal from '../confirm-delete/ConfirmDeleteModal'

const ModalsProvider = () => {
  const {
    taskDetailsModalIsOpen,
    taskFormModalIsOpen,
    boardFormModalIsOpen,
    confirmDeleteIsOpen,
  } = useGetAppState()

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

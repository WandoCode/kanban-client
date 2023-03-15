import useGetAppState from '../useGetAppState'
import TaskDetailsModal from '../task-details/TaskDetailsModal'
import ModalTaskForm from '../taskForm/TaskFormModal'
import BoardFormModal from '../board-form/BoardFormModal'

const ModalsProvider = () => {
  const { taskDetailsModalIsOpen, taskFormModalIsOpen, boardFormModalIsOpen } =
    useGetAppState()

  return (
    <>
      {taskDetailsModalIsOpen && <TaskDetailsModal />}
      {taskFormModalIsOpen && <ModalTaskForm />}
      {boardFormModalIsOpen && <BoardFormModal />}
    </>
  )
}

export default ModalsProvider

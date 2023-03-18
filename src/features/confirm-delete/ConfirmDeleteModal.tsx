import Modal from '../modal/Modal'
import { useAppDispatch, useAppSelector } from '../app.store'
import { closeConfirmDelete } from './confirmDelete.actions'
import Button from '../../components/atoms/Button/Button'
import { deleteBoardAndSave, deleteTaskAndSave } from '../board/boards.thunk'

const ConfirmDeleteModal = () => {
  const dispatch = useAppDispatch()
  const { boards, currentBoardId } = useAppSelector((s) => s.boards)
  const { type } = useAppSelector((s) => s.confirmDelete)
  const { task } = useAppSelector((s) => s.taskDetails)

  const onDelete = () => {
    if (type === 'board') dispatch(deleteBoardAndSave())
    if (type === 'task') dispatch(deleteTaskAndSave())

    dispatch(closeConfirmDelete())
  }

  const onClose = () => {
    dispatch(closeConfirmDelete())
  }

  return (
    <Modal closeModal={() => dispatch(closeConfirmDelete())}>
      <form className="confirm-delete modal-add-task">
        <h2 className="heading-l fc-primary-800">
          {type === 'board' && 'Delete this board?'}
          {type === 'task' && 'Delete this Task?'}
        </h2>
        <p className="fc-neutral-400">
          {boards && type === 'board' && (
            <>
              Are you sure you want to delete the ‘{boards[currentBoardId].name}
              ’ board? This action will remove all columns and tasks and cannot
              be reversed.
            </>
          )}
          {task && type === 'task' && (
            <>
              Are you sure you want to delete the ‘{task.title}’ task and its
              subtasks? This action cannot be reversed.
            </>
          )}
        </p>

        <div className="confirm-delete__buttons">
          <Button text="Delete" type="destructive" onClick={onDelete} />
          <Button text="Cancel" type="secondary" onClick={onClose} />
        </div>
      </form>
    </Modal>
  )
}

export default ConfirmDeleteModal

import { useAppSelector, useAppDispatch } from '../app.store'
import { getNbrCompletedSubtask } from '../../utils/number'
import InputCheck from '../../components/atoms/Input/InputCheck'
import {
  toogleSubtask,
  updateTaskStatus,
  closeModalTaskDetails,
} from './taskDetails.actions'
import Select from '../../components/atoms/Select/Select'
import { useEffect } from 'react'
import { updateTaskAndSave } from '../board/boards.thunk'
import TaskMenu from '../menus/TaskMenu'

function TaskDetailsModal() {
  const dispatch = useAppDispatch()
  const { task } = useAppSelector((state) => state.taskDetails)
  const { currentColumnsNames } = useAppSelector((state) => state.boards)

  useEffect(() => {
    document.body.addEventListener('click', handleCloseModal)

    return () => document.body.removeEventListener('click', handleCloseModal)
  }, [])

  const handleCloseModal = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    if (target.classList.contains('modal')) {
      dispatch(updateTaskAndSave())
      dispatch(closeModalTaskDetails())
    }
  }

  const handleSubtaskClick = (idString: string) => {
    const index = parseInt(idString.split('-')[1], 10)
    dispatch(toogleSubtask(index))
  }

  const subtaskDOM = () => {
    return task.subtasks.map((subtask, i) => {
      return (
        <InputCheck
          text={subtask.title}
          key={`subtask-${i}`}
          id={`subtask-${i}`}
          isChecked={subtask.isCompleted}
          onChange={handleSubtaskClick}
        />
      )
    })
  }

  return (
    <div className="modal-task-details modal-add-task">
      <div className="modal-task-details__header">
        <h2 className="heading-l">{task.title}</h2>
        <TaskMenu />
      </div>
      {task.description && <p className="fc-neutral-450">{task.description}</p>}
      <div>
        <h3 className="modal-add-task__subtasks-title text-bold fc-neutral-450">
          Subtasks ({getNbrCompletedSubtask(task)} of {task.subtasks.length})
        </h3>
        {subtaskDOM()}
      </div>
      <Select
        currValue={task.status}
        label="Status"
        choices={currentColumnsNames}
        onChoice={(choice) => dispatch(updateTaskStatus(choice))}
      />
    </div>
  )
}

export default TaskDetailsModal

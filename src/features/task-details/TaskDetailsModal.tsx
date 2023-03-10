import { useAppSelector, useAppDispatch } from '../app.store'
import { getNbrCompletedSubtask } from '../../utils/number'
import InputCheck from '../../components/atoms/Input/InputCheck'
import { toogleSubtask } from './taskDetails.actions'
function TaskDetailsModal() {
  const dispatch = useAppDispatch()
  const { task } = useAppSelector((state) => state.taskDetails)

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
    <div className="modal-add-task">
      <h2 className="heading-l">{task.title}</h2>
      <p className="fc-neutral-450">{task.description}</p>
      <div>
        <h3 className="text-bold fc-neutral-450">
          Subtasks ({getNbrCompletedSubtask(task)} of {task.subtasks.length})
        </h3>
        {subtaskDOM()}
      </div>
    </div>
  )
}

export default TaskDetailsModal

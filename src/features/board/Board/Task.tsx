import { getNbrCompletedSubtask } from '../../../utils/number'
import { TaskType } from '../boards.reducer'

interface Props {
  task: TaskType
  openTask: (task: TaskType, taskIndex: number) => void
  taskIndex: number
}

function Task({ task, taskIndex, openTask }: Props) {
  const handleOpenTask = () => {
    openTask(task, taskIndex)
  }

  return (
    <button className="task" onClick={handleOpenTask}>
      <div className="task__heading heading-m">{task.title}</div>
      <div className="task__subtask text-bold fc-neutral-400">
        {getNbrCompletedSubtask(task)} of {task.subtasks.length} subtasks
      </div>
    </button>
  )
}

export default Task

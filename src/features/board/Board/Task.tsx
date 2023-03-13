import { getNbrCompletedSubtask } from '../../../utils/number'
import { TaskType } from '../boards.reducer'

interface Props {
  task: TaskType
  openTask: (task: TaskType) => void
}

function Task({ task, openTask }: Props) {
  const handleOpenTask = () => {
    openTask(task)
  }

  return (
    <button className="task" onClick={handleOpenTask}>
      <span className="task__heading heading-m">{task.title}</span>
      <span className="task__subtask text-bold fc-neutral-400">
        {getNbrCompletedSubtask(task)} of {task.subtasks.length} subtasks
      </span>
    </button>
  )
}

export default Task

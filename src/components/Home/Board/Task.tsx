import { TaskType } from '../../../features/board/board.reducers'

interface Props {
  task: TaskType
}

function Task({ task }: Props) {
  const getNbrCompletedSubtask = () => {
    return task.subtasks.reduce((nbrCompletedSubtask, subtask) => {
      if (subtask.isCompleted) return nbrCompletedSubtask + 1
      return nbrCompletedSubtask
    }, 0)
  }

  return (
    <div className="task" key={task.position}>
      <div className="task__heading heading-m">{task.title}</div>
      <div className="task__subtask text-bold fc-neutral-400">
        {getNbrCompletedSubtask()} of {task.subtasks.length} subtasks
      </div>
    </div>
  )
}

export default Task

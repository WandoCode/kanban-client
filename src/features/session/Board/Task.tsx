import { TaskType } from '../session.reducers'

interface Props {
  task: TaskType
  openTask: () => void
}

function Task({ task, openTask }: Props) {
  const getNbrCompletedSubtask = () => {
    return task.subtasks.reduce((nbrCompletedSubtask, subtask) => {
      if (subtask.isCompleted) return nbrCompletedSubtask + 1
      return nbrCompletedSubtask
    }, 0)
  }

  return (
    <button className="task" key={task.position} onClick={openTask}>
      <div className="task__heading heading-m">{task.title}</div>
      <div className="task__subtask text-bold fc-neutral-400">
        {getNbrCompletedSubtask()} of {task.subtasks.length} subtasks
      </div>
    </button>
  )
}

export default Task

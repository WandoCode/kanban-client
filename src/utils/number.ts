import { TaskType } from '../features/board/boards.reducer'

export const getNbrCompletedSubtask = (task: TaskType) => {
  return task.subtasks.reduce((nbrCompletedSubtask, subtask) => {
    if (subtask.isCompleted) return nbrCompletedSubtask + 1
    return nbrCompletedSubtask
  }, 0)
}

import { createAction } from '@reduxjs/toolkit'
import { TaskType } from '../board/boards.reducer'

interface OpenTask {
  isEditing?: boolean
  task: TaskType
}

export const openTaskFormModal = createAction(
  'taskForm/openTaskFormModal',
  (isEditing?: boolean, task?: TaskType) => ({ payload: { isEditing, task } })
)

export const closeTaskFormModal = createAction('taskForm/closeTaskFormModal')

export const updateInput = createAction(
  'taskForm/updateInput',
  (fieldName: string, value: string) => ({ payload: { fieldName, value } })
)

export const updateSubtask = createAction(
  'taskForm/updateSubtask',
  (subtaskIndex: number, value: string, subtaskIsCompleted: boolean) => ({
    payload: { subtaskIndex, value, subtaskIsCompleted },
  })
)

export const addSubtask = createAction('taskForm/addSubtask')

export const removeSubtask = createAction(
  'taskForm/removeSubtask',
  (subtaskIndex: number) => ({
    payload: { subtaskIndex },
  })
)

export const setErrors = createAction(
  'taskForm/setErrors',
  (errors: string[]) => ({
    payload: { errors },
  })
)

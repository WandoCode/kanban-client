import { createAction } from '@reduxjs/toolkit'

export const openAddNewTaskModal = createAction(
  'addNewTask/openAddNewTaskModal'
)

export const closeAddNewTaskModal = createAction(
  'addNewTask/closeAddNewTaskModal'
)

export const updateInput = createAction(
  'addNewTask/updateInput',
  (fieldName: string, value: string) => ({ payload: { fieldName, value } })
)

export const updateSubtask = createAction(
  'addNewTask/updateSubtask',
  (subtaskIndex: number, value: string, subtaskIsCompleted: boolean) => ({
    payload: { subtaskIndex, value, subtaskIsCompleted },
  })
)

export const setErrors = createAction(
  'addNewTask/setErrors',
  (errors: string[]) => ({
    payload: { errors },
  })
)

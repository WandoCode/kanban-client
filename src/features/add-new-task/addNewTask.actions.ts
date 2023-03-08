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

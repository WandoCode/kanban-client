import { createAction } from '@reduxjs/toolkit'
import { Choice } from '../../components/atoms/Select/Select'

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
  (subtaskIndex: number, value: string) => ({
    payload: { subtaskIndex, value },
  })
)

export const setChoices = createAction(
  'addNewTask/setChoices',
  (choices: Choice[]) => ({
    payload: { choices },
  })
)

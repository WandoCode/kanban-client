import { createAction } from '@reduxjs/toolkit'
import { TaskType } from '../session/session.reducers'

export const setTaskDetails = createAction(
  'taskDetails/setTaskDetails',
  (task: TaskType) => ({ payload: task })
)

export const openModalTaskDetails = createAction(
  'taskDetails/openModalTaskDetails'
)

export const closeModalTaskDetails = createAction(
  'taskDetails/closeModalTaskDetails'
)

export const toogleSubtask = createAction(
  'taskDetails/toogleSubtask',
  (index: number) => ({ payload: { index } })
)

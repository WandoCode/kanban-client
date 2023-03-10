import { createAction } from '@reduxjs/toolkit'
import { TaskType } from '../board/boards.reducer'

export const setTaskDetails = createAction(
  'taskDetails/setTaskDetails',
  (task: TaskType, taskIndex: number) => ({ payload: { task, taskIndex } })
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

export const updateTaskStatus = createAction(
  'taskDetails/updateTaskStatus',
  (status: string) => ({ payload: { status } })
)

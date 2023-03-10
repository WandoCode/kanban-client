import { createReducer } from '@reduxjs/toolkit'
import {
  setTaskDetails,
  openModalTaskDetails,
  closeModalTaskDetails,
} from './taskDetails.actions'
import { toogleSubtask, updateTaskStatus } from './taskDetails.actions'
import { TaskType } from '../board/boards.reducer'

interface TaskDetails {
  taskDetailsModalIsOpen: boolean
  task: TaskType
  taskIndex: number
}
const initialState: TaskDetails = {
  taskDetailsModalIsOpen: false,
  taskIndex: -1,
  task: { title: '', description: '', subtasks: [], status: '' },
}

const taskDetailsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTaskDetails, (state, action) => {
      state.task.title = action.payload.task.title
      state.task.description = action.payload.task.description
      state.task.subtasks = action.payload.task.subtasks
      state.task.status = action.payload.task.status
      state.taskIndex = action.payload.taskIndex
    })
    .addCase(openModalTaskDetails, (state) => {
      state.taskDetailsModalIsOpen = true
    })
    .addCase(closeModalTaskDetails, (state) => {
      state.taskDetailsModalIsOpen = false
    })
    .addCase(toogleSubtask, (state, action) => {
      const { index } = action.payload
      state.task.subtasks[index].isCompleted =
        !state.task.subtasks[index].isCompleted
    })
    .addCase(updateTaskStatus, (state, action) => {
      const { status } = action.payload
      state.task.status = status
    })
})

export default taskDetailsReducer

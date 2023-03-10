import { createReducer } from '@reduxjs/toolkit'
import {
  setTaskDetails,
  openModalTaskDetails,
  closeModalTaskDetails,
} from './taskDetails.actions'
import { TaskType } from '../session/session.reducers'
import { toogleSubtask } from './taskDetails.actions'

interface TaskDetails {
  taskDetailsModalIsOpen: boolean
  task: TaskType
}
const initialState: TaskDetails = {
  taskDetailsModalIsOpen: false,
  task: { title: '', description: '', subtasks: [], status: '' },
}

const taskDetailsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTaskDetails, (state, action) => {
      state.task.title = action.payload.title
      state.task.description = action.payload.description
      state.task.subtasks = action.payload.subtasks
      state.task.status = action.payload.status
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
})

export default taskDetailsReducer

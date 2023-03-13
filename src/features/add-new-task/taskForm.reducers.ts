import { createReducer } from '@reduxjs/toolkit'
import {
  updateSubtask,
  setErrors,
  openTaskFormModal,
  closeTaskFormModal,
} from './taskForm.actions'
import { SubtaskType } from '../board/boards.reducer'

import { updateInput, removeSubtask } from './taskForm.actions'

interface AddNewTaskType {
  taskFormModalIsOpen: boolean
  formErrors: string[]
  isEditing: boolean
  formDatas: {
    title: string
    description: string
    subtasks: SubtaskType[]
    status: string
    taskId: string
    [key: string]: any
  }
}

const initialFormDatas = {
  title: '',
  description: '',
  subtasks: [
    { title: '', isCompleted: false },
    { title: '', isCompleted: false },
  ],
  status: '',
  taskId: '',
}

const initialState: AddNewTaskType = {
  taskFormModalIsOpen: false,
  isEditing: false,
  formErrors: [],
  formDatas: initialFormDatas,
}

const taskFormReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(openTaskFormModal, (state, action) => {
      state.taskFormModalIsOpen = true
      if (action.payload.isEditing && action.payload.task) {
        state.isEditing = action.payload.isEditing
        state.formDatas = action.payload.task
      }
    })
    .addCase(closeTaskFormModal, (state) => {
      state.taskFormModalIsOpen = false
      state.isEditing = false
      state.formErrors = []
      state.formDatas = initialFormDatas
    })
    .addCase(updateInput, (state, action) => {
      const { fieldName, value } = action.payload

      state.formDatas[fieldName] = value
    })
    .addCase(updateSubtask, (state, action) => {
      const { subtaskIndex, value, subtaskIsCompleted } = action.payload

      state.formDatas.subtasks[subtaskIndex] = {
        title: value,
        isCompleted: subtaskIsCompleted,
      }
    })
    .addCase(removeSubtask, (state, action) => {
      const { subtaskIndex } = action.payload

      if (state.formDatas.subtasks.length === 1)
        state.formDatas.subtasks = [{ title: '', isCompleted: false }]
      else {
        const substaskCopy = [...state.formDatas.subtasks]
        substaskCopy.splice(subtaskIndex, 1)
        state.formDatas.subtasks = substaskCopy
      }
    })
    .addCase(setErrors, (state, action) => {
      const { errors } = action.payload

      state.formErrors = errors
    })
})

export default taskFormReducer

import { createReducer } from '@reduxjs/toolkit'
import {
  updateSubtask,
  setErrors,
  openTaskFormModal,
  closeTaskFormModal,
} from './taskForm.actions'
import { SubtaskType } from '../board/boards.reducer'

import { updateInput, removeSubtask, addSubtask } from './taskForm.actions'

export interface TaskFormDatas {
  title: string
  description: string
  subtasks: SubtaskType[]
  status: string
  taskId: string
  [key: string]: any
}

interface AddNewTaskType {
  taskFormModalIsOpen: boolean
  taskFormErrors: string[]
  isEditingTaskForm: boolean
  taskFormDatas: TaskFormDatas
}

const emptySubtask: SubtaskType = { title: '', isCompleted: false }

const initialFormDatas = {
  title: '',
  description: '',
  subtasks: [{ ...emptySubtask }, { ...emptySubtask }],
  status: '',
  taskId: '',
}

const initialState: AddNewTaskType = {
  taskFormModalIsOpen: false,
  isEditingTaskForm: false,
  taskFormErrors: [],
  taskFormDatas: initialFormDatas,
}

const taskFormReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(openTaskFormModal, (state, action) => {
      state.taskFormModalIsOpen = true
      if (action.payload.isEditing && action.payload.task) {
        state.isEditingTaskForm = action.payload.isEditing
        state.taskFormDatas = action.payload.task
      }
    })
    .addCase(closeTaskFormModal, (state) => {
      state.taskFormModalIsOpen = false
      state.isEditingTaskForm = false
      state.taskFormErrors = []
      state.taskFormDatas = initialFormDatas
    })
    .addCase(updateInput, (state, action) => {
      const { fieldName, value } = action.payload

      state.taskFormDatas[fieldName] = value
    })
    .addCase(updateSubtask, (state, action) => {
      const { subtaskIndex, value, subtaskIsCompleted } = action.payload

      state.taskFormDatas.subtasks[subtaskIndex] = {
        title: value,
        isCompleted: subtaskIsCompleted,
      }
    })
    .addCase(removeSubtask, (state, action) => {
      const { subtaskIndex } = action.payload

      if (state.taskFormDatas.subtasks.length === 1)
        state.taskFormDatas.subtasks = [{ ...emptySubtask }]
      else {
        const substaskCopy = [...state.taskFormDatas.subtasks]
        substaskCopy.splice(subtaskIndex, 1)
        state.taskFormDatas.subtasks = substaskCopy
      }
    })
    .addCase(addSubtask, (state) => {
      const substaskCopy = [...state.taskFormDatas.subtasks]
      substaskCopy.push({ ...emptySubtask })
      state.taskFormDatas.subtasks = substaskCopy
    })
    .addCase(setErrors, (state, action) => {
      const { errors } = action.payload

      state.taskFormErrors = errors
    })
})

export default taskFormReducer

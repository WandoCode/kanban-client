import { createReducer } from '@reduxjs/toolkit'
import { updateSubtask, setErrors } from './addNewTask.actions'
import { SubtaskType } from '../session/session.reducers'
import {
  openAddNewTaskModal,
  closeAddNewTaskModal,
  updateInput,
} from './addNewTask.actions'

interface AddNewTaskType {
  addNewTaskModalIsOpen: boolean
  formErrors: string[]
  formDatas: {
    title: string
    description: string
    subtasks: SubtaskType[]
    status: string
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
}

const initialState: AddNewTaskType = {
  addNewTaskModalIsOpen: false,
  formErrors: [],
  formDatas: initialFormDatas,
}

const addNewTaskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(openAddNewTaskModal, (state) => {
      state.addNewTaskModalIsOpen = true
    })
    .addCase(closeAddNewTaskModal, (state) => {
      state.addNewTaskModalIsOpen = false
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
    .addCase(setErrors, (state, action) => {
      const { errors } = action.payload

      state.formErrors = errors
    })
})

export default addNewTaskReducer

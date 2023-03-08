import { createReducer } from '@reduxjs/toolkit'
import {
  openAddNewTaskModal,
  closeAddNewTaskModal,
  updateInput,
} from './addNewTask.actions'

interface AddNewTaskType {
  addNewTaskModalIsOpen: boolean
  formDatas: {
    title: string
    description: string
    subtasks: string[]
    status: string
    [key: string]: any
  }
}
const initialState: AddNewTaskType = {
  addNewTaskModalIsOpen: false,
  formDatas: {
    title: '',
    description: '',
    subtasks: ['', ''],
    status: '',
  },
}

const addNewTaskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(openAddNewTaskModal, (state) => {
      state.addNewTaskModalIsOpen = true
    })
    .addCase(closeAddNewTaskModal, (state) => {
      state.addNewTaskModalIsOpen = false
    })
    .addCase(updateInput, (state, action) => {
      const { fieldName, value } = action.payload

      state.formDatas[fieldName] = value
    })
})

export default addNewTaskReducer

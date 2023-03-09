import { createReducer } from '@reduxjs/toolkit'
import { updateSubtask, setChoices } from './addNewTask.actions'
import { Choice } from '../../components/atoms/Select/Select'
import {
  openAddNewTaskModal,
  closeAddNewTaskModal,
  updateInput,
} from './addNewTask.actions'

interface AddNewTaskType {
  addNewTaskModalIsOpen: boolean
  choices: Choice[]

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
  choices: [],
}

const addNewTaskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(openAddNewTaskModal, (state) => {
      state.addNewTaskModalIsOpen = true
    })
    .addCase(closeAddNewTaskModal, (state) => {
      console.log(1)

      state.addNewTaskModalIsOpen = false
    })
    .addCase(updateInput, (state, action) => {
      const { fieldName, value } = action.payload

      state.formDatas[fieldName] = value
    })
    .addCase(updateSubtask, (state, action) => {
      const { subtaskIndex, value } = action.payload

      state.formDatas.subtasks[subtaskIndex] = value
    })
    .addCase(setChoices, (state, action) => {
      const { choices } = action.payload

      state.choices = choices
      state.formDatas.status = choices[0].value
    })
})

export default addNewTaskReducer

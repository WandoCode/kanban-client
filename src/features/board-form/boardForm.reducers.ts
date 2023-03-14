import { createReducer } from '@reduxjs/toolkit'
import { ColumnType } from '../board/boards.reducer'
import {
  updateInput,
  updateColumn,
  removeColumn,
  setErrors,
} from './boardForm.actions'

interface BoardFormDatas {
  boardName: string
  boardId: string
  columns: ColumnType[]
  [key: string]: any
}

interface InitialState {
  isEditing: boolean
  formDatas: BoardFormDatas
  formErrors: string[]
}

const initialState: InitialState = {
  isEditing: false,
  formDatas: {
    boardId: '',
    boardName: '',
    columns: [],
  },
  formErrors: [],
}

const boardFormReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateInput, (state, action) => {
      const { fieldName, newValue } = action.payload
      state.formDatas[fieldName] = newValue
    })
    .addCase(updateColumn, (state, action) => {
      const { columnIndex, columnName, columnColor } = action.payload
      state.formDatas.columns[columnIndex].name = columnName
      state.formDatas.columns[columnIndex].color = columnColor
    })
    .addCase(removeColumn, (state, action) => {
      const { columnIndex } = action.payload
      const columnsCopy = [...state.formDatas.columns]
      columnsCopy.splice(columnIndex, 0)
      state.formDatas.columns = columnsCopy
    })
    .addCase(setErrors, (state, action) => {
      const { errors } = action.payload
      state.formErrors = errors
    })
})

export default boardFormReducer

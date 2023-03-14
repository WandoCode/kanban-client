import { createReducer } from '@reduxjs/toolkit'
import { ColumnType } from '../board/boards.reducer'
import { updateColumncolor } from './boardForm.actions'
import {
  openBoardFormModal,
  closeBoardFormModal,
  updateColumnName,
} from './boardForm.actions'
import {
  updateInput,
  removeColumn,
  setErrors,
  addColumn,
} from './boardForm.actions'

interface BoardFormDatas {
  boardName: string
  columns: ColumnType[]
  [key: string]: any
}

interface InitialState {
  boardFormModalIsOpen: boolean
  isEditing: boolean
  formDatas: BoardFormDatas
  formErrors: string[]
}

const emptyColumn = { name: '', color: '#49c4e5' }
const initialState: InitialState = {
  boardFormModalIsOpen: false,
  isEditing: false,
  formDatas: {
    boardName: '',
    columns: [{ ...emptyColumn }],
  },
  formErrors: [],
}

const boardFormReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(openBoardFormModal, (state, action) => {
      state.boardFormModalIsOpen = true
      state.isEditing = action.payload.isEditing
    })
    .addCase(closeBoardFormModal, (state) => {
      state.boardFormModalIsOpen = false
      state.isEditing = false
      state.formDatas = initialState.formDatas
      state.formErrors = []
    })
    .addCase(updateInput, (state, action) => {
      const { fieldName, newValue } = action.payload
      state.formDatas[fieldName] = newValue
    })
    .addCase(addColumn, (state) => {
      const columnsCopy = [...state.formDatas.columns]
      columnsCopy.push({ ...emptyColumn })
      state.formDatas.columns = columnsCopy
    })
    .addCase(updateColumnName, (state, action) => {
      const { columnIndex, columnName } = action.payload
      state.formDatas.columns[columnIndex].name = columnName
    })
    .addCase(updateColumncolor, (state, action) => {
      const { columnIndex, columnColor } = action.payload

      state.formDatas.columns[columnIndex].color = columnColor
    })
    .addCase(removeColumn, (state, action) => {
      const { columnIndex } = action.payload

      if (state.formDatas.columns.length === 1)
        state.formDatas.columns = [{ ...emptyColumn }]
      else {
        const columnsCopy = [...state.formDatas.columns]
        columnsCopy.splice(columnIndex, 1)

        state.formDatas.columns = columnsCopy
      }
    })
    .addCase(setErrors, (state, action) => {
      const { errors } = action.payload
      state.formErrors = errors
    })
})

export default boardFormReducer

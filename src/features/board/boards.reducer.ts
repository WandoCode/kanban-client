import { createReducer } from '@reduxjs/toolkit'
import { applyChangeBoard } from './boards.actions'
import { setBoards, setColumnsArrayByStatus } from './boards.actions'

export interface ColumnType {
  name: string
  color: string
}

export interface SubtaskType {
  title: string
  isCompleted: boolean
}

export interface TaskType {
  title: string
  description: string
  status: string
  subtasks: SubtaskType[]
}

export interface BoardType {
  id: string
  name: string
  columns: ColumnType[]
  tasks: TaskType[]
}

export interface BoardsDatasType {
  [x: string]: BoardType
}

export interface BoardsType {
  boards: BoardsDatasType | null
  currentBoardId: string
  currentColumns: ColumnType[]
  currentColumnsNames: string[]
  columnsArrayByStatus: {
    [x: string]: TaskType[]
  } | null
}

const initialState: BoardsType = {
  boards: null,
  currentBoardId: '',
  currentColumns: [],
  currentColumnsNames: [],
  columnsArrayByStatus: null,
}

const boardsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setBoards, (state, action) => {
      state.boards = action.payload.boards
    })
    .addCase(applyChangeBoard, (state, action) => {
      const {
        newColumns,
        newColumnsArrayByStatus,
        newColumnsNames,
        newBoardName,
      } = action.payload
      state.currentBoardId = newBoardName
      state.columnsArrayByStatus = newColumnsArrayByStatus
      state.currentColumns = newColumns
      state.currentColumnsNames = newColumnsNames
    })
    .addCase(setColumnsArrayByStatus, (state, action) => {
      state.columnsArrayByStatus = action.payload.columnsArrayByStatus
    })
})

export default boardsReducer

import { createReducer } from '@reduxjs/toolkit'
import { applyChangeBoard, updateBoards, resetBoards } from './boards.actions'
import { setBoards } from './boards.actions'

export interface ColumnType {
  name: string
  color: string
}

export interface SubtaskType {
  title: string
  isCompleted: boolean
}

export interface TaskType {
  taskId: string
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
      state.currentBoardId = action.payload.currentBoardId
      state.columnsArrayByStatus = action.payload.newColumnsArrayByStatus
      state.currentColumns = action.payload.newColumns
      state.currentColumnsNames = action.payload.newColumnsNames
    })
    .addCase(resetBoards, () => initialState)
    .addCase(applyChangeBoard, (state, action) => {
      state.currentBoardId = action.payload.newBoardId
      state.columnsArrayByStatus = action.payload.newColumnsArrayByStatus
      state.currentColumns = action.payload.newColumns
      state.currentColumnsNames = action.payload.newColumnsNames
    })
    .addCase(updateBoards, (state, action) => {
      state.boards = action.payload.boards
      state.currentColumns = action.payload.newColumns
      state.currentColumnsNames = action.payload.newColumnsNames
      state.columnsArrayByStatus = action.payload.newColumnsArrayByStatus
    })
})

export default boardsReducer

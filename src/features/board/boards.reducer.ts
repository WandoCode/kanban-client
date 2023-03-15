import { createReducer } from '@reduxjs/toolkit'
import { applyChangeBoard, updateBoards } from './boards.actions'
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
  boards: BoardsDatasType
  currentBoardId: string
  currentColumns: ColumnType[]
  currentColumnsNames: string[]
  columnsArrayByStatus: {
    [x: string]: TaskType[]
  } | null
}

const initialState: BoardsType = {
  boards: {},
  currentBoardId: '',
  currentColumns: [],
  currentColumnsNames: [],
  columnsArrayByStatus: null,
}

const boardsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setBoards, (state, action) => {
      const {
        boards,
        currentBoardId,
        newColumns,
        newColumnsNames,
        newColumnsArrayByStatus,
      } = action.payload
      state.boards = boards
      state.currentBoardId = currentBoardId
      state.columnsArrayByStatus = newColumnsArrayByStatus
      state.currentColumns = newColumns
      state.currentColumnsNames = newColumnsNames
    })
    .addCase(applyChangeBoard, (state, action) => {
      const {
        newColumns,
        newColumnsArrayByStatus,
        newColumnsNames,
        newBoardId,
      } = action.payload
      state.currentBoardId = newBoardId
      state.columnsArrayByStatus = newColumnsArrayByStatus
      state.currentColumns = newColumns
      state.currentColumnsNames = newColumnsNames
    })
    .addCase(setColumnsArrayByStatus, (state, action) => {
      state.columnsArrayByStatus = action.payload.columnsArrayByStatus
    })
    .addCase(updateBoards, (state, action) => {
      const newBoards = action.payload.boards
      state.boards = newBoards
      state.currentColumns = newBoards[state.currentBoardId].columns
      state.currentColumnsNames = newBoards[state.currentBoardId].columns.map(
        (e) => e.name
      )
      state.columnsArrayByStatus = getColumnsArrayByStatus(
        newBoards[state.currentBoardId].tasks
      )
    })
})

export default boardsReducer

const getColumnsArrayByStatus = (tasks: TaskType[]) => {
  let rep: Record<string, TaskType[]> = {}

  tasks.forEach((task) => {
    const column = task.status

    if (!rep[column]) rep[column] = []
    rep[column].push(task)
  })

  return rep
}

import { createReducer } from '@reduxjs/toolkit'
import { setUserDatas, setCurrentBoard } from './session.actions'

export interface TaskType {
  title: string
  description: string
  status: string
  position: number
  subtasks: {
    title: string
    isCompleted: boolean
  }[]
}

export interface ColumnType {
  name: string
  color: string
  datas: TaskType[] | undefined
}

export interface BoardType {
  uniqid: number
  name: string
  columns: ColumnType[]
}

export interface Session {
  userID: number | null
  boards: BoardType[]
  currentBoardID: number | null
  currentBoardcolumnsNames: string[]
}

const initialSessionState: Session = {
  userID: null,
  boards: [],
  currentBoardID: null,
  currentBoardcolumnsNames: [],
}

const sessionReducer = createReducer(initialSessionState, (builder) => {
  builder
    .addCase(setUserDatas, (state, action) => {
      if (action.payload) {
        state.userID = action.payload.userID
        state.boards = action.payload.boards
        state.currentBoardID = action.payload.currentBoardID
        state.currentBoardcolumnsNames = action.payload.currentBoardcolumnsNames
      } else {
        state = initialSessionState
      }
    })
    .addCase(setCurrentBoard, (state, action) => {
      const currentBoardDatas = state.boards.find(
        (board) => board.uniqid === action.payload
      )

      state.currentBoardID = action.payload
      state.currentBoardcolumnsNames =
        currentBoardDatas?.columns.map((column) => column.name) || []
    })
})

export default sessionReducer

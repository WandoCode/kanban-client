import { createReducer } from '@reduxjs/toolkit'
import { setBoardDatas, setNoBoardDatas } from './board.actions'

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

export interface BoardDatas {
  columnsNames: string[]
  boardID: number | null
  columnsDatas: ColumnType[]
}

export interface BoardRawDatas {
  uniqid: number
  columns: ColumnType[]
}

const initialBoardState: BoardDatas = {
  columnsNames: [],
  boardID: null,
  columnsDatas: [],
}

const boardReducer = createReducer(initialBoardState, (builder) => {
  builder.addCase(setBoardDatas, (state, action) => {
    state.boardID = action.payload.uniqid
    state.columnsNames = action.payload.columns.map((col) => col.name)
    state.columnsDatas = action.payload.columns
  })
  builder.addCase(setNoBoardDatas, () => initialBoardState)
})

export default boardReducer

// TODO: en mobile, le chevron dans le header doit tourner quand le menu est ouvert

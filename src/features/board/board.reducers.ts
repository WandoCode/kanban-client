import { createReducer } from '@reduxjs/toolkit'
import { setBoard } from './board.actions'

interface Note {
  title: string
  description: string
  status: string
  position: number
  subtasks: {
    title: string
    isCompleted: boolean
  }[]
}

interface Column {
  [x: string]: Note[]
}

export interface BoardDatas {
  columnsNames: string[]
  boardID: number | null
  columnsDatas: Column[]
}

export interface BoardRawDatas {
  uniqid: number
  columns: Column[]
}

const initialBoardState: BoardDatas = {
  columnsNames: [],
  boardID: null,
  columnsDatas: [],
}

const boardReducer = createReducer(initialBoardState, (builder) => {
  builder.addCase(setBoard, (state, action) => {
    if (action.payload) {
      state.boardID = action.payload.uniqid
      state.columnsNames = Object.keys(action.payload.columns)
      state.columnsDatas = action.payload.columns
    } else {
      state = initialBoardState
      // TODO : A l'effet escompté? ie. reinitialise le board?
    }
  })
})

export default boardReducer

// TODO: en mobile, le cevron dans le header doit tourner quand le menu est ouvert

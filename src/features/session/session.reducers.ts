import { createReducer } from '@reduxjs/toolkit'
import { setUserDatas, setCurrentBoard } from './session.actions'

export interface BoardShort {
  uniqid: number
  name: string
  columns: string[]
}

export interface UserDatas {
  userID: number | null
  boards: BoardShort[]
}

export interface Session extends UserDatas {
  currentBoardID: number | null
  currentColumns: string[]
}

const initialSessionState: Session = {
  userID: null,
  boards: [],
  currentBoardID: null,
  currentColumns: [],
}

const sessionReducer = createReducer(initialSessionState, (builder) => {
  builder
    .addCase(setUserDatas, (state, action) => {
      if (action.payload) {
        state.userID = action.payload.userID
        state.boards = action.payload.boards
      } else {
        state = initialSessionState
      }
    })
    .addCase(setCurrentBoard, (state, action) => {
      state.currentBoardID = action.payload
    })
})

export default sessionReducer

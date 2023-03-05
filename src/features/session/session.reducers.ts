import { createReducer } from '@reduxjs/toolkit'
import { setUserDatas, setCurrentBoard } from './session.actions'

export interface Board {
  uniqid: number
  name: string
  columns: string[]
}

export interface UserDatas {
  userID: number | null
  boards: Board[]
}

interface Session extends UserDatas {
  currentBoardID: number | null
}

const initialSessionState: Session = {
  userID: null,
  boards: [],
  currentBoardID: null,
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

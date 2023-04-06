import { createReducer } from '@reduxjs/toolkit'
import {
  setUserDatas,
  updateBoardsShort,
  connectUser,
  disconnectUser,
} from './session.actions'

export interface BoardShort {
  id: string
  name: string
}

export interface Session {
  userID: string | null
  isDemoUser: boolean
  boardsShort: BoardShort[]
}

const initialSessionState: Session = {
  userID: '',
  isDemoUser: false,
  boardsShort: [],
}

const sessionReducer = createReducer(initialSessionState, (builder) => {
  builder
    .addCase(connectUser, (state, action) => {
      state.userID = action.payload.userID
      state.isDemoUser = action.payload.isDemoUser
    })
    .addCase(disconnectUser, (state) => {
      state.userID = null
      state.boardsShort = []
    })
    .addCase(setUserDatas, (state, action) => {
      if (action.payload) {
        state.userID = action.payload.userID
        state.boardsShort = action.payload.boardsShort
      } else {
        state = initialSessionState
      }
    })
    .addCase(updateBoardsShort, (state, action) => {
      state.boardsShort = action.payload.newBoardsShort
    })
})

export default sessionReducer

import { createReducer } from '@reduxjs/toolkit'
import { setUserDatas } from './session.actions'

export interface Board {
  uniqid: number
  name: string
  columns: string[]
}

export interface UserDatas {
  userID: number | null
  boards: Board[]
}

const initialSessionState: UserDatas = {
  userID: null,
  boards: [],
}

const sessionReducer = createReducer(initialSessionState, (builder) => {
  builder.addCase(setUserDatas, (state, action) => {
    if (action.payload) {
      state.userID = action.payload.userID
      state.boards = action.payload.boards
    } else {
      state = initialSessionState
    }
  })
})

export default sessionReducer

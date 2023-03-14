import { createAction } from '@reduxjs/toolkit'
import { Session, BoardShort } from './session.reducers'

export const setUserDatas = createAction(
  'session/setUserDatas',
  (userDatas: Session | undefined) => ({ payload: userDatas })
)

export const updateBoardsShort = createAction(
  'session/updateBoardsShort',
  (newBoardsShort: BoardShort[]) => ({ payload: { newBoardsShort } })
)

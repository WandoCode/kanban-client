import { createAction } from '@reduxjs/toolkit'
import { Session } from './session.reducers'

export const setUserDatas = createAction(
  'session/setUserDatas',
  (userDatas: Session | undefined) => ({ payload: userDatas })
)

export const setCurrentBoard = createAction(
  'session/setCurrentBoard',
  (currentBoardID: number) => ({ payload: currentBoardID })
)

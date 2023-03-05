import { createAction } from '@reduxjs/toolkit'
import { UserDatas } from './session.reducers'

export const setUserDatas = createAction(
  'session/setUserDatas',
  (userDatas: UserDatas | undefined) => ({ payload: userDatas })
)

export const setCurrentBoard = createAction(
  'session/setCurrentBoard',
  (currentBoardID: number) => ({ payload: currentBoardID })
)

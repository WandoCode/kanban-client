import { createAction } from '@reduxjs/toolkit'
import { Session, TaskType, BoardType } from './session.reducers'

export const setUserDatas = createAction(
  'session/setUserDatas',
  (userDatas: Session | undefined) => ({ payload: userDatas })
)

export const setCurrentBoard = createAction(
  'session/setCurrentBoard',
  (currentBoardID: number) => ({ payload: currentBoardID })
)

export const setBoards = createAction(
  'session/addTask',
  (newBoards: BoardType[]) => ({
    payload: newBoards,
  })
)

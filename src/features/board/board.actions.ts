import { createAction } from '@reduxjs/toolkit'
import { BoardRawDatas } from './board.reducers'

export const setBoardDatas = createAction(
  'board/setBoard',
  (newBoard: BoardRawDatas | undefined) => ({ payload: newBoard })
)

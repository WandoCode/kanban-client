import { createAction } from '@reduxjs/toolkit'
import { BoardsDatasType, TaskType, ColumnType } from './boards.reducer'

export const setBoards = createAction(
  'boards/setBoards',
  (
    boards: BoardsDatasType,
    currentBoardId: string,
    newColumns: ColumnType[],
    newColumnsNames: string[],
    newColumnsArrayByStatus: Record<string, TaskType[]>
  ) => ({
    payload: {
      boards,
      currentBoardId,
      newColumnsArrayByStatus,
      newColumns,
      newColumnsNames,
    },
  })
)

export const resetBoards = createAction('boards/resetBoards')

export const applyChangeBoard = createAction(
  'boards/applyChangeBoard',
  (
    newBoardId: string,
    newColumns: ColumnType[],
    newColumnsNames: string[],
    newColumnsArrayByStatus: Record<string, TaskType[]>
  ) => ({
    payload: {
      newBoardId,
      newColumns,
      newColumnsNames,
      newColumnsArrayByStatus,
    },
  })
)

export const updateBoards = createAction(
  'boards/updateBoards',
  (
    boards: BoardsDatasType,
    newColumns: ColumnType[],
    newColumnsNames: string[],
    newColumnsArrayByStatus: Record<string, TaskType[]>
  ) => ({
    payload: { boards, newColumns, newColumnsNames, newColumnsArrayByStatus },
  })
)

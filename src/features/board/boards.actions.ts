import { createAction } from '@reduxjs/toolkit'
import { BoardsDatasType, TaskType, ColumnType } from './boards.reducer'

export const setBoards = createAction(
  'boards/setBoards',
  ({ boards }: { boards: BoardsDatasType }) => ({ payload: { boards } })
)

export const applyChangeBoard = createAction(
  'boards/applyChangeBoard',
  (
    newBoardName: string,
    newColumns: ColumnType[],
    newColumnsNames: string[],
    newColumnsArrayByStatus: Record<string, TaskType[]>
  ) => ({
    payload: {
      newBoardName,
      newColumns,
      newColumnsNames,
      newColumnsArrayByStatus,
    },
  })
)

export const setColumnsArrayByStatus = createAction(
  'boards/setColumnsArrayByStatus',
  (columnsArrayByStatus: { [x: string]: TaskType[] }) => ({
    payload: { columnsArrayByStatus },
  })
)

export const updateBoards = createAction(
  'boards/updateBoards',
  (boards: BoardsDatasType, currentBoardID: string) => ({
    payload: { boards, currentBoardID },
  })
)

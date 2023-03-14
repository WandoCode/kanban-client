import { createAction } from '@reduxjs/toolkit'

export const openBoardFormModal = createAction('boardForm/openBoardFormModal')

export const closeBoardFormModal = createAction('boardForm/closeBoardFormModal')

export const updateInput = createAction(
  'boardForm/updateInput',
  (fieldName: string, newValue: string) => ({
    payload: { fieldName, newValue },
  })
)

export const addColumn = createAction('boardForm/addColumn')

export const updateColumnName = createAction(
  'boardForm/updateColumnName',
  (columnIndex: number, columnName: string) => ({
    payload: { columnIndex, columnName },
  })
)

export const updateColumncolor = createAction(
  'boardForm/updateColumncolor',
  (columnIndex: number, columnColor: string) => ({
    payload: { columnIndex, columnColor },
  })
)

export const removeColumn = createAction(
  'boardForm/removeColumn',
  (columnIndex: number) => ({
    payload: { columnIndex },
  })
)

export const setErrors = createAction(
  'boardForm/setErrors',
  (errors: string[]) => ({
    payload: { errors },
  })
)

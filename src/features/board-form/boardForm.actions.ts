import { createAction } from '@reduxjs/toolkit'

export const updateInput = createAction(
  'boardForm/updateInput',
  (fieldName: string, newValue: string) => ({
    payload: { fieldName, newValue },
  })
)

export const updateColumn = createAction(
  'boardForm/updateColumn',
  (columnIndex: number, columnName: string, columnColor: string) => ({
    payload: { columnIndex, columnName, columnColor },
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

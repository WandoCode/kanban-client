import { createAction } from '@reduxjs/toolkit'
import { TypeOfConfirmDelete } from './confirmDelete.reducer'

export const openConfirmDelete = createAction(
  'confirmDelete/openConfirmDelete',
  (type: TypeOfConfirmDelete) => ({ payload: { type } })
)

export const closeConfirmDelete = createAction(
  'confirmDelete/closeConfirmDelete'
)

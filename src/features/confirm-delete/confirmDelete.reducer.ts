import { createReducer } from '@reduxjs/toolkit'
import { openConfirmDelete, closeConfirmDelete } from './confirmDelete.actions'
export type TypeOfConfirmDelete = 'task' | 'board'

interface ConfirmDelete {
  confirmDeleteIsOpen: boolean
  type: TypeOfConfirmDelete | undefined
}
const initialState: ConfirmDelete = {
  confirmDeleteIsOpen: false,
  type: undefined,
}

const confirmDeleteReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(openConfirmDelete, (state, action) => {
      state.confirmDeleteIsOpen = true
      state.type = action.payload.type
    })
    .addCase(closeConfirmDelete, (state) => {
      state.confirmDeleteIsOpen = false
    })
})

export default confirmDeleteReducer

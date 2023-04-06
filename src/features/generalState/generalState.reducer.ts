import { createReducer } from '@reduxjs/toolkit'
import { setTheme, setDemoUserModal } from './generalState.actions'

const initialState = {
  theme: 'light',
  modalDemoUserIsOpen: false,
}

const generalStateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTheme, (state, action) => {
      state.theme = action.payload.newTheme
    })
    .addCase(setDemoUserModal, (state, action) => {
      state.modalDemoUserIsOpen = action.payload.modalDemoUserIsOpen
    })
})

export default generalStateReducer

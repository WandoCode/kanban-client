import { createReducer } from '@reduxjs/toolkit'
import { openMenu, closeMenu } from './sidebar.actions'

const initialState = {
  sidebarIsOpen: true,
}

const sidebarReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(openMenu, (state) => {
      state.sidebarIsOpen = true
    })
    .addCase(closeMenu, (state) => {
      state.sidebarIsOpen = false
    })
})

export default sidebarReducer

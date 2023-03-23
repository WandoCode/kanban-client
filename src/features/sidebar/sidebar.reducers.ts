import { createReducer } from '@reduxjs/toolkit'
import { openMenu, closeMenu } from './sidebar.actions'

const initialState = {
  menuIsOpen: false,
}

const sidebarReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(openMenu, (state) => {
      state.menuIsOpen = true
    })
    .addCase(closeMenu, (state) => {
      state.menuIsOpen = false
    })
})

export default sidebarReducer

import { createReducer } from '@reduxjs/toolkit'
import { setTheme, closeMenu, openMenu } from './generalState.actions'

const initialState = {
  theme: 'light',
  menuIsOpen: false,
}

const generalStateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTheme, (state, action) => {
      state.theme = action.payload.newTheme
    })
    .addCase(openMenu, (state) => {
      state.menuIsOpen = true
    })

    .addCase(closeMenu, (state) => {
      state.menuIsOpen = false
    })
})

export default generalStateReducer

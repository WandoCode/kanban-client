import { createReducer } from '@reduxjs/toolkit'
import { setTheme, closeMenu, openMenu } from './generalState.actions'

const initialState = {
  theme: 'light',
  menuIsOpen: true,
}

const generalStateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTheme, (state, action) => {
      state.theme = action.payload.newTheme
    })
    .addCase(openMenu, (state) => {
      console.log(true)

      state.menuIsOpen = true
    })

    .addCase(closeMenu, (state) => {
      console.log(false)

      state.menuIsOpen = false
    })
})

export default generalStateReducer

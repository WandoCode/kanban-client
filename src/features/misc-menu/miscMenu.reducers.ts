import { createReducer } from '@reduxjs/toolkit'
import { toggleMiscMenu } from './miscMenu.actions'

const initialState = {
  miscMenuIsOpen: false,
}

const miscMenuReducer = createReducer(initialState, (builder) => {
  builder.addCase(toggleMiscMenu, (state) => {
    state.miscMenuIsOpen = !state.miscMenuIsOpen
  })
})

export default miscMenuReducer

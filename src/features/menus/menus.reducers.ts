import { createReducer } from '@reduxjs/toolkit'
import { toggleMiscMenu, toggleTaskMenu } from './menus.actions'

const initialState = {
  miscMenuIsOpen: false,
  taskMenuIsOpen: false,
}

const menusReducer = createReducer(initialState, (builder) => {
  builder.addCase(toggleMiscMenu, (state) => {
    state.miscMenuIsOpen = !state.miscMenuIsOpen
    state.taskMenuIsOpen = false
  })
  builder.addCase(toggleTaskMenu, (state) => {
    state.taskMenuIsOpen = !state.taskMenuIsOpen
    state.miscMenuIsOpen = false
  })
})

export default menusReducer

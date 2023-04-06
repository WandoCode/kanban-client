import { createReducer } from '@reduxjs/toolkit'
import { setTheme } from './generalState.actions'

const initialState = {
  theme: 'light',
}

const generalStateReducer = createReducer(initialState, (builder) => {
  builder.addCase(setTheme, (state, action) => {
    state.theme = action.payload.newTheme
  })
})

export default generalStateReducer

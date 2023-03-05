import { configureStore } from '@reduxjs/toolkit'
import generalStateReducer from './generalState/generalState.reducer'

const store = configureStore({
  reducer: {
    generalState: generalStateReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

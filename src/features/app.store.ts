import { configureStore } from '@reduxjs/toolkit'
import generalStateReducer from './generalState/generalState.reducer'
import sessionReducer from './session/session.reducers'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import boardReducer from './board/board.reducers'
import miscMenuReducer from './misc-menu/miscMenu.reducers'
import sidebarReducer from './sidebar/sidebar.reducers'
import addNewTaskReducer from './add-new-task/addNewTask.reducers'

const store = configureStore({
  reducer: {
    generalState: generalStateReducer,
    sidebar: sidebarReducer,
    session: sessionReducer,
    board: boardReducer,
    miscMenu: miscMenuReducer,
    addNewTask: addNewTaskReducer,
  },
})

export default store

type DispatchFunc = () => AppDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

import { configureStore } from '@reduxjs/toolkit'
import generalStateReducer from './generalState/generalState.reducer'
import sessionReducer from './session/session.reducers'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
// import boardReducer from './board/board.reducers'
import menusReducer from './menus/menus.reducers'
import sidebarReducer from './sidebar/sidebar.reducers'
import taskDetailsReducer from './task-details/taskDetails.reducers'
import boardsReducer from './board/boards.reducer'
import taskFormReducer from './add-new-task/taskForm.reducers'

const store = configureStore({
  reducer: {
    generalState: generalStateReducer,
    sidebar: sidebarReducer,
    session: sessionReducer,
    menus: menusReducer,
    taskForm: taskFormReducer,
    taskDetails: taskDetailsReducer,
    boards: boardsReducer,
  },
})

export default store

type DispatchFunc = () => AppDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

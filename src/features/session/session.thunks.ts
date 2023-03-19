import { RootState, useAppSelector } from '../app.store'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { boardsStore } from '../../store/boardsStore'
import {
  setUserDatas,
  updateBoardsShort,
  disconnectUser,
} from './session.actions'
import { BoardShort } from './session.reducers'
import { BoardsDatasType } from '../board/boards.reducer'
import authStore from '../../store/authStore'
import { resetBoards } from '../board/boards.actions'
import localStore from '../../store/localStore'
import { connectUser } from './session.actions'
import {
  resetSignInForm,
  setSignInFormHasError,
} from '../sign-in/signIn.actions'

export function fetchUserDetails(
  userID: string
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function fetchUserDetailsThunk(dispatch) {
    const userDetails = await boardsStore.getUserDetails(userID)
    if (userDetails) {
      dispatch(setUserDatas(userDetails))
    }
  }
}

export function updateUserBoardsAndSave(
  userID: string,
  boards: BoardsDatasType
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function updateUserBoardsAndSaveThunk(dispatch) {
    const newBoardsShort: BoardShort[] = []

    for (const boardName in boards) {
      const board = boards[boardName]
      newBoardsShort.push({ id: board.id, name: board.name })
    }

    await boardsStore.updateUserBoardsShort(userID, newBoardsShort)

    dispatch(updateBoardsShort(newBoardsShort))
  }
}

export function signOutUser(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async function signOutUserThunk(dispatch) {
    await authStore.logOutUser()
    localStore.removeUser()
    dispatch(disconnectUser())
    dispatch(resetBoards())
  }
}

export function logInUserOrNotifyError(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async function logInUserOrNotifyErrorThunk(dispatch, getState) {
    const state = getState()
    const { formDatas } = state.signIn

    let user
    if (window.location.hostname === 'localhost') {
      user = await authStore.logginUser(formDatas.email, formDatas.password)
      if (!user)
        user = await authStore.initMockUser(formDatas.email, formDatas.password)
    } else {
      user = await authStore.logginUser(formDatas.email, formDatas.password)
    }

    if (user) {
      localStore.saveUser(user)
      dispatch(connectUser(user.uid))

      dispatch(resetSignInForm())
    } else dispatch(setSignInFormHasError(true))
  }
}

export function keepSessionAlive(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async function keepSessionAliveThunk(dispatch) {
    const user = localStore.getUser()

    if (user) dispatch(connectUser(user.uid))
  }
}

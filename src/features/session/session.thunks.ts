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
import { resetSignForm, setSignFormErrors } from '../signForm/signForm.actions'

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

export function updateUserBoardsShortAndSave(
  userID: string,
  boards: BoardsDatasType
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function updateUserBoardsShortAndSaveThunk(dispatch) {
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

export function createUserOrNotifyError(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async function createUserOrNotifyErrorThunk(dispatch, getState) {
    const state = getState()
    const { formDatas } = state.signForm

    const user = await authStore.createNewUser(
      formDatas.email,
      formDatas.password
    )

    if (user) {
      await boardsStore.createUserDetails(user.uid)
      localStore.saveUser(user)
      dispatch(connectUser(user.uid))

      dispatch(resetSignForm())
    } else dispatch(setSignFormErrors(['connexion']))
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
    const { formDatas } = state.signForm

    let user
    if (window.location.hostname === 'localhost') {
      console.warn(
        "You're in development mode. While using the hostname 'localhost', a new user is created when none is found into the test database."
      )
      user = await authStore.logginUser(formDatas.email, formDatas.password)
      if (!user)
        console.warn(
          "No user found into test DB while on 'localhost': a new user has been created."
        )
      user = await authStore.initMockUser(formDatas.email, formDatas.password)
    } else {
      user = await authStore.logginUser(formDatas.email, formDatas.password)
    }

    if (user) {
      localStore.saveUser(user)
      dispatch(connectUser(user.uid))

      dispatch(resetSignForm())
    } else dispatch(setSignFormErrors(['connexion']))
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

import { RootState, useAppSelector } from '../app.store'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { boardsStore } from '../../store/boardsStore'
import { setUserDatas, updateBoardsShort } from './session.actions'
import { BoardShort } from './session.reducers'
import { BoardsDatasType } from '../board/boards.reducer'

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

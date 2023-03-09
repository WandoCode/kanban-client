import usersStore from '../../store/usersStore'
import { setUserDatas, setCurrentBoard } from './session.actions'
import { RootState } from '../app.store'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { boardsStore } from '../../store/boardsStore'

export function fetchUserById(
  userID: number
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function fetchUserByIdThunk(dispatch) {
    // const userDatas = await usersStore.getUserDatas(userID)

    const boardsDatas = await boardsStore.getUserBoards(userID)

    if (boardsDatas) {
      // Au chargement, on ouvre le 1er projet de la liste
      const currentBoardID = boardsDatas[0].uniqid
      const currentBoardcolumnsNames = boardsDatas[0].columns.map(
        (column) => column.name
      )

      const sessionDatas = {
        userID,
        boards: boardsDatas,
        currentBoardID,
        currentBoardcolumnsNames,
      }

      dispatch(setUserDatas(sessionDatas))
    }
  }
}

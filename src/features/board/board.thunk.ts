import { ThunkAction } from 'redux-thunk'
import { RootState } from '../app.store'
import { AnyAction } from 'redux'
import { boardsStore } from '../../store/boardsStore'
import { setBoardDatas } from './board.actions'

export function fetchBoardDatasById(
  boardId: number
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function fetchBoardDatasByIdThunk(dispatch) {
    const boardDatas = await boardsStore.getBoard(boardId)

    dispatch(setBoardDatas(boardDatas))
  }
}

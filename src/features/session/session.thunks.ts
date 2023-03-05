import usersStore from '../../store/usersStore'
import { setUserDatas } from './session.actions'
import { RootState } from '../app.store'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'

export function fetchUserById(
  userID: number
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function fetchUserByIdThunk(dispatch) {
    const userDatas = await usersStore.getUser(userID)

    dispatch(setUserDatas(userDatas))
  }
}

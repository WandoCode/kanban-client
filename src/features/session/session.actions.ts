import { createAction } from '@reduxjs/toolkit'
import { UserDatas } from './session.reducers'

export const setUserDatas = createAction(
  'session/setUserDatas',
  (userDatas: UserDatas | undefined) => ({ payload: userDatas })
)

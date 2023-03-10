import { createAction } from '@reduxjs/toolkit'
import { Session } from './session.reducers'

export const setUserDatas = createAction(
  'session/setUserDatas',
  (userDatas: Session | undefined) => ({ payload: userDatas })
)

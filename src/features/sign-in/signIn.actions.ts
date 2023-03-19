import { createAction } from '@reduxjs/toolkit'

export const updateSignInFormDatas = createAction(
  'signIn/updateSignInFormDatas',
  (newValue: string, fieldName: string) => ({
    payload: { newValue, fieldName },
  })
)

export const setSignInFormHasError = createAction(
  'signIn/setSignInFormHasError',
  (hasError: boolean) => ({
    payload: { hasError },
  })
)

export const resetSignInForm = createAction('signIn/resetSignInForm')

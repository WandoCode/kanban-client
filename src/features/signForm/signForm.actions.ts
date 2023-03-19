import { createAction } from '@reduxjs/toolkit'

export const updateSignFormDatas = createAction(
  'signForm/updateSignFormDatas',
  (newValue: string, fieldName: string) => ({
    payload: { newValue, fieldName },
  })
)

export const setSignFormHasError = createAction(
  'signForm/setSignFormHasError',
  (hasError: boolean, errorName: string) => ({
    payload: { hasError, errorName },
  })
)

export const resetSignForm = createAction('signForm/resetSignForm')
export const resetErrorSignForm = createAction('signForm/resetErrorSignForm')

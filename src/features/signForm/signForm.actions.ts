import { createAction } from '@reduxjs/toolkit'
import { SignFormErrorsValues } from './signForm.reducer'

export const updateSignFormDatas = createAction(
  'signForm/updateSignFormDatas',
  (newValue: string, fieldName: string) => ({
    payload: { newValue, fieldName },
  })
)

export const setSignFormErrors = createAction(
  'signForm/setSignFormHasError',
  (errors: SignFormErrorsValues[]) => ({
    payload: { errors },
  })
)

export const resetSignForm = createAction('signForm/resetSignForm')
export const resetErrorSignForm = createAction('signForm/resetErrorSignForm')

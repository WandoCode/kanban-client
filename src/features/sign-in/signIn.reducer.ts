import { createReducer } from '@reduxjs/toolkit'
import {
  updateSignInFormDatas,
  resetSignInForm,
  setSignInFormHasError,
} from './signIn.actions'

export interface SignInFormData {
  email: string
  password: string
  [x: string]: string
}

export interface SignInForm {
  formDatas: SignInFormData
  hasError: boolean
}

const initialState: SignInForm = {
  formDatas: {
    email: '',
    password: '',
  },
  hasError: false,
}

const signInReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateSignInFormDatas, (state, action) => {
      const { newValue, fieldName } = action.payload

      state.formDatas[fieldName] = newValue
    })
    .addCase(setSignInFormHasError, (state, action) => {
      const { hasError } = action.payload

      state.hasError = hasError
    })
    .addCase(resetSignInForm, () => initialState)
})

export default signInReducer

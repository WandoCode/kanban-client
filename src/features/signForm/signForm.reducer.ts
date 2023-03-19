import { createReducer } from '@reduxjs/toolkit'
import { resetErrorSignForm } from './signForm.actions'
import {
  updateSignFormDatas,
  resetSignForm,
  setSignFormHasError,
} from './signForm.actions'

export interface SignFormData {
  email: string
  password: string
  confirmation: string
  [x: string]: string
}
export interface ErrorSignForm {
  email: boolean
  samePassword: boolean
  connexion: boolean
  [x: string]: boolean
}

export interface SignForm {
  formDatas: SignFormData
  formError: ErrorSignForm
}

const initialErrorForm = {
  email: false,
  samePassword: false,
  connexion: false,
}
const initialState: SignForm = {
  formDatas: {
    email: '',
    password: '',
    confirmation: '',
  },
  formError: { ...initialErrorForm },
}

const signFormReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateSignFormDatas, (state, action) => {
      const { newValue, fieldName } = action.payload

      state.formDatas[fieldName] = newValue
    })
    .addCase(setSignFormHasError, (state, action) => {
      const { hasError, errorName } = action.payload

      state.formError[errorName] = hasError
    })
    .addCase(resetSignForm, () => initialState)
    .addCase(resetErrorSignForm, (state) => {
      state.formError = { ...initialErrorForm }
    })
})

export default signFormReducer

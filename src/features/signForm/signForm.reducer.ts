import { createReducer } from '@reduxjs/toolkit'
import { resetErrorSignForm, setSignFormErrors } from './signForm.actions'
import { updateSignFormDatas, resetSignForm } from './signForm.actions'

export interface SignFormData {
  email: string
  password: string
  confirmation: string
  [x: string]: string
}

export type SignFormErrorsValues =
  | 'email'
  | 'samePassword'
  | 'connexion'
  | 'emptyPassword'
  | 'emptyConfirmation'

export interface SignForm {
  formDatas: SignFormData
  formError: Record<SignFormErrorsValues, boolean>
}

const initialErrorForm: Record<SignFormErrorsValues, boolean> = {
  email: false,
  samePassword: false,
  connexion: false,
  emptyPassword: false,
  emptyConfirmation: false,
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
    .addCase(setSignFormErrors, (state, action) => {
      const errors = action.payload.errors

      const newFormErrorsCopy = { ...initialErrorForm }
      for (const errorName in newFormErrorsCopy) {
        if (errors.includes(errorName as SignFormErrorsValues))
          newFormErrorsCopy[errorName as SignFormErrorsValues] = true
      }
      state.formError = newFormErrorsCopy
    })
    .addCase(resetSignForm, () => initialState)
    .addCase(resetErrorSignForm, (state) => {
      state.formError = { ...initialErrorForm }
    })
})

export default signFormReducer

import { createAction } from '@reduxjs/toolkit'

export const setTheme = createAction(
  'generalState/setTheme',
  (newTheme: 'dark' | 'light') => ({ payload: { newTheme } })
)

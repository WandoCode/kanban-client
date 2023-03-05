import { createAction } from '@reduxjs/toolkit'

export const setTheme = createAction(
  'generalState/setTheme',
  (newTheme: 'dark' | 'light') => ({ payload: { newTheme } })
)
export const closeMenu = createAction('generalState/closeMenu')
export const openMenu = createAction('generalState/openMenu')

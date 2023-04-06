import { createAction } from '@reduxjs/toolkit'

export const setTheme = createAction(
  'generalState/setTheme',
  (newTheme: 'dark' | 'light') => ({ payload: { newTheme } })
)
export const setDemoUserModal = createAction(
  'generalState/closeDemoUserModal',
  (modalDemoUserIsOpen: boolean) => ({ payload: { modalDemoUserIsOpen } })
)

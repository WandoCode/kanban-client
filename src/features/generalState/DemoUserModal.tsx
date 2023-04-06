import React from 'react'
import Modal from '../modal/Modal'
import { useAppDispatch } from '../app.store'
import { setDemoUserModal } from './generalState.actions'

export const DemoUserModal = () => {
  const dispatch = useAppDispatch()

  const closeDemoUserModal = () => {
    dispatch(setDemoUserModal(false))
  }

  return (
    <Modal closeModal={closeDemoUserModal}>
      <h2>Demo account</h2>
      <p>
        You are using a demo only account. You will be able to use the Kaban App
        but the change will not be updated in the database.
      </p>
      <p>To make permanent changes, you have the create your own account.</p>
    </Modal>
  )
}

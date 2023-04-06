import React from 'react'
import Modal from '../modal/Modal'
import { useAppDispatch } from '../app.store'
import { setDemoUserModal } from './generalState.actions'
import Button from '../../components/atoms/Button/Button'

export const DemoUserModal = () => {
  const dispatch = useAppDispatch()

  const closeDemoUserModal = () => {
    dispatch(setDemoUserModal(false))
  }

  return (
    <Modal closeModal={closeDemoUserModal}>
      <div className="demo-user-modal">
        <h2 className="heading-l">Demo account</h2>
        <p>You are currently using a demonstration account.</p>{' '}
        <p>
          You will be able to use the Kaban App with all the features but the
          change will not be updated in the database: when the page will be
          reloaded, all the changes will be lost.
        </p>
        <p>To make permanent updates, you have to create your own account.</p>
        <Button text="Close" type="primary-s" onClick={closeDemoUserModal} />
      </div>
    </Modal>
  )
}

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
        <p className="fc-neutral-500">
          You are currently using a demonstration account.
        </p>
        <p className="fc-neutral-500">
          You will be able to use the Kaban App with all the features but the
          modifications will not be updated in the database
          <span className="fc-primary-800">
            : it's then normal that
            <u>
              {' '}
              when the page will be reloaded, all the changes will be lost.
            </u>
          </span>
        </p>

        <p className="fc-neutral-500">
          <strong> To make permanent updates</strong>, you have to create your
          own account: 'Sign Out' &gt; 'Create a new account'.
        </p>
        <Button text="Close" type="primary-s" onClick={closeDemoUserModal} />
      </div>
    </Modal>
  )
}

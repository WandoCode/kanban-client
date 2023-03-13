import { PropsWithChildren, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Props extends PropsWithChildren {
  handleCloseModal: (e: MouseEvent) => void
}

function Modal({ handleCloseModal, children }: Props) {
  const modalRoot = document.getElementById('modal-root')

  useEffect(() => {
    document.body.addEventListener('mousedown', handleCloseModal)

    return () =>
      document.body.removeEventListener('mousedown', handleCloseModal)
  }, [])

  if (!modalRoot) return null
  else
    return createPortal(
      <div className="modal">
        <div className="modal__content">{children}</div>
      </div>,
      modalRoot
    )
}

export default Modal

import { PropsWithChildren, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Props extends PropsWithChildren {
  closeModal: () => void
}

function Modal({ closeModal, children }: Props) {
  const modalRoot = document.getElementById('modal-root')

  useEffect(() => {
    document.body.addEventListener('mousedown', handleCloseModal)

    return () =>
      document.body.removeEventListener('mousedown', handleCloseModal)
  }, [])

  const handleCloseModal = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    if (target.classList.contains('modal')) closeModal()
  }

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

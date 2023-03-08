import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

function Modal({ children }: PropsWithChildren) {
  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return null
  else return createPortal(<div className="modal">{children}</div>, modalRoot)
}

export default Modal

import { PropsWithChildren } from 'react'

function Modal({ children }: PropsWithChildren) {
  return <div className="modal">{children}</div>
}

export default Modal

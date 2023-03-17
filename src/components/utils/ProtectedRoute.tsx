import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const userConnected = true

  if (userConnected) return <div>{children}</div>
  else return <Navigate to="/singin" />
}

export default ProtectedRoute

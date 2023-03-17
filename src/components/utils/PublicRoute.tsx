import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }: PropsWithChildren) => {
  const userConnected = true

  if (!userConnected) return <div>{children}</div>
  else return <Navigate to="/" />
}

export default PublicRoute

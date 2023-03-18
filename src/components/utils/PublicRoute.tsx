import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import useGetAppState from '../../features/useGetAppState'

const PublicRoute = ({ children }: PropsWithChildren) => {
  const { userID } = useGetAppState()

  if (!userID) return <div>{children}</div>
  else return <Navigate to="/" />
}

export default PublicRoute

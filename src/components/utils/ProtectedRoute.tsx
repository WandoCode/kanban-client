import { PropsWithChildren, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../features/app.store'

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { userID } = useAppSelector((s) => s.session)

  if (userID) return <>{children}</>
  else return <Navigate to="/signin" />
}

export default ProtectedRoute

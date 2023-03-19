import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import ProtectedRoute from './components/utils/ProtectedRoute'
import PublicRoute from './components/utils/PublicRoute'
import SignUp from './pages/SignUp'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="signin"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router

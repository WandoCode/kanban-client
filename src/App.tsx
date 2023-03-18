import './stylesheets/main.scss'
import Home from './pages/Home'
import { useEffect } from 'react'
import { boardsStore } from './store/boardsStore'
import ModalsProvider from './features/modal/ModalsProvider'
import Router from './Router'
import authStore from './store/authStore'
import { useAppDispatch } from './features/app.store'
import { connectUser } from './features/session/session.actions'

function App() {
  const dispatch = useAppDispatch()

  const initMock = async () => {
    let userID
    userID = await authStore.connectMockUser()
    if (!userID) userID = await authStore.initMockUser()
    if (!userID) return

    boardsStore.initMockDatas(userID)
    dispatch(connectUser(userID))
  }

  useEffect(() => {
    const env = process.env.NODE_ENV

    if (env === 'development') {
      initMock()
    }
  }, [])

  return (
    <div className="app">
      <Router />
      <ModalsProvider />
    </div>
  )
}

export default App

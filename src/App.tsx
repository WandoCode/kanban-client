import './stylesheets/main.scss'
import { useEffect } from 'react'
import { boardsStore } from './store/boardsStore'
import ModalsProvider from './features/modal/ModalsProvider'
import Router from './Router'
import { useAppSelector, useAppDispatch } from './features/app.store'
import { keepSessionAlive } from './features/session/session.thunks'
import { Licence } from './components/utils/Licence'

function App() {
  const dispatch = useAppDispatch()
  const { userID } = useAppSelector((s) => s.session)
  const { theme } = useAppSelector((s) => s.generalState)

  useEffect(() => {
    dispatch(keepSessionAlive())
  }, [])

  useEffect(() => {
    const env = process.env.NODE_ENV
    if (env === 'development' && userID) {
      // Fill DB with mock datas while in devlopement
      boardsStore.initMockDatas(userID)
    }
  }, [userID])

  useEffect(() => {
    document.body.id = theme
  }, [theme])

  return (
    <div className="app">
      <Router />
      <ModalsProvider />
      <Licence />
    </div>
  )
}

export default App

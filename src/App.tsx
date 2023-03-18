import './stylesheets/main.scss'
import { useEffect } from 'react'
import { boardsStore } from './store/boardsStore'
import ModalsProvider from './features/modal/ModalsProvider'
import Router from './Router'
import { useAppSelector } from './features/app.store'

function App() {
  const { userID } = useAppSelector((s) => s.session)

  useEffect(() => {
    const env = process.env.NODE_ENV

    // Fill DB with mock datas while in devlopement
    if (env === 'development' && userID) {
      boardsStore.initMockDatas(userID)
    }
  }, [userID])

  return (
    <div className="app">
      <Router />
      <ModalsProvider />
    </div>
  )
}

export default App

import './stylesheets/main.scss'
import Home from './pages/Home'
import { useEffect } from 'react'
import { boardsStore } from './store/boardsStore'
import ModalsProvider from './features/modal/ModalsProvider'
import Router from './Router'

function App() {
  useEffect(() => {
    const env = process.env.NODE_ENV

    if (env === 'development') boardsStore.initMockDatas()
  }, [])

  return (
    <div className="app">
      <Router />
      <ModalsProvider />
    </div>
  )
}

export default App

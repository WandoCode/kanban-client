import './stylesheets/main.scss'
import Home from './pages/Home'
import { useEffect } from 'react'
import { boardsStore } from './store/boardsStore'
import ModalsProvider from './features/modal/ModalsProvider'

function App() {
  useEffect(() => {
    const env = process.env.NODE_ENV

    // if (env === 'development') boardsStore.initMockDatas()
  }, [])

  return (
    <div className="app">
      <ModalsProvider />
      <Home />
    </div>
  )
}

export default App

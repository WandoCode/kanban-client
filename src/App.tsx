import './stylesheets/main.scss'
import Home from './pages/Home'
import { useEffect } from 'react'
import { boardsStore } from './store/boardsStore'
import ModalsProvider from './features/modal/ModalsProvider'

function App() {
  useEffect(() => {
    const env = process.env.NODE_ENV

    if (env === 'development') boardsStore.initMockDatas()
  }, [])

  return (
    <div className="app">
      <ModalsProvider />
      <Home />
    </div>
  )
}

export default App

// TODO: datas structure de prod: 1 table pour les données de tous les utilisateurs (dont un id unique par user) + 1 table par utilisateurs qui contient tous ses boards (contenu dans une array) et l'id de ce user

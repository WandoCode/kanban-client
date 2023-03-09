import './stylesheets/main.scss'
import Home from './pages/Home'

function App() {
  return (
    <div className="app">
      <Home />
    </div>
  )
}

export default App

// TODO: datas structure de prod: 1 table pour les données de tous les utilisateurs (dont un id unique par user) + 1 table par utilisateurs qui contient tous ses boards (contenu dans une array) et l'id de ce user

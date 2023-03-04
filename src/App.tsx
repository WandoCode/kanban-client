import './stylesheets/main.scss'
import InputCheck from './components/atoms/Input/InputCheck'

function App() {
  return (
    <div className="app">
      <InputCheck
        text="Value"
        id="value-a"
        isChecked={false}
        onChange={() => {}}
      />
    </div>
  )
}

export default App

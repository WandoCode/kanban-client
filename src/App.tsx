import './stylesheets/main.scss'
import InputText from './components/atoms/Input/InputText'

function App() {
  return (
    <div className="app">
      <InputText
        value=""
        id="value-a"
        hasError={false}
        onChange={() => {}}
        placeholder="Enter task name"
        errorText="Can't be empty"
        label="Title"
        showLabel={true}
      />
    </div>
  )
}

export default App

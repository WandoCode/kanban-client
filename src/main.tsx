import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './features/app.store'
import FloatingShowSidebar from './features/sidebar/FloatingShowSidebar'
import ModalRoot from './features/modal/ModalRoot'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <FloatingShowSidebar />
      <ModalRoot />
    </Provider>
  </React.StrictMode>
)

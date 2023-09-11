import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './assets/style/main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AuthContextProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </AuthContextProvider> */}
  </StrictMode>,
)

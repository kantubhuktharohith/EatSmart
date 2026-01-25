import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'  // No /src/ prefix needed, they are neighbors now
import './index.css'         // No /src/ prefix needed

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <App />
    </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { VoiceProvider } from './contexts/VoiceContext'
import { VoiceTrainerProvider } from './contexts/VoiceTrainerContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VoiceProvider>
      <VoiceTrainerProvider>
        <App />
      </VoiceTrainerProvider>
    </VoiceProvider>
  </React.StrictMode>,
)

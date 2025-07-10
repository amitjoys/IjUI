import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Performance optimization: Use concurrent features
const root = createRoot(document.getElementById('root')!)

// Remove the fallback loading state and render the app
const rootElement = document.getElementById('root')!
if (rootElement.innerHTML.includes('loading-container')) {
  rootElement.innerHTML = ''
}

root.render(<App />)



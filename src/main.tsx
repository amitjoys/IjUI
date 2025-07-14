import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Simple, clean render without loading interference
const root = createRoot(document.getElementById('root')!)
root.render(<App />)



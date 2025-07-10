import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      '.emergentagent.com',
      '.preview.emergentagent.com',
      'responsive-layout-2.preview.emergentagent.com',
      '1e4e62a1-ebf9-44f8-9e85-87db24c7be02.preview.emergentagent.com'
    ]
  }
})

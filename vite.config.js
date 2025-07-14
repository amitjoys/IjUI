import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
    disableHostCheck: true,
    hmr: {
      host: 'localhost'
    },
    watch: {
      usePolling: true,
      interval: 1000
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React bundle
          'react-vendor': ['react', 'react-dom'],
          // Router and motion
          'routing-vendor': ['react-router-dom', 'framer-motion'],
          // Charts and visualization
          'chart-vendor': ['recharts'], 
          // Carousel and sliders
          'carousel-vendor': ['react-slick', 'slick-carousel'],
          // Icons bundle
          'icon-vendor': ['lucide-react', 'react-icons'],
          // Headless UI and utilities
          'ui-vendor': ['@headlessui/react', 'axios', 'ua-parser-js'],
          // Virtualization
          'virtualization-vendor': ['react-window']
        }
      }
    },
    chunkSizeWarningLimit: 600,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn', 'console.debug']
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    target: 'esnext',
    assetsInlineLimit: 8192,
    reportCompressedSize: false
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'lucide-react',
      'framer-motion',
      'react-window'
    ]
  }
})
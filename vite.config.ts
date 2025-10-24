import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-core';
          }
          // Router separate chunk
          if (id.includes('react-router')) {
            return 'router';
          }
          // Axios separate
          if (id.includes('axios')) {
            return 'http';
          }
          // Icons - keep separate and smaller
          if (id.includes('react-icons')) {
            return 'icons';
          }
          // Admin pages - lazy loaded so separate
          if (id.includes('/admin/')) {
            return 'admin';
          }
          // Large pages
          if (id.includes('HomePage') || id.includes('CollectionsPage')) {
            return 'pages-main';
          }
          // Other pages
          if (id.includes('/pages/')) {
            return 'pages-other';
          }
          // Utils and services
          if (id.includes('/services/') || id.includes('/utils/') || id.includes('/hooks/')) {
            return 'utils';
          }
          // Components
          if (id.includes('/components/')) {
            return 'components';
          }
          // Everything else as vendor
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    minify: 'esbuild',
    chunkSizeWarningLimit: 300,
    target: 'es2015',
    cssCodeSplit: true,
    reportCompressedSize: false,
    assetsInlineLimit: 4096
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['react-icons']
  },
  preview: {
    port: 5173,
    strictPort: false
  }
})

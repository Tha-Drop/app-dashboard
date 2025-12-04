import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //host: "10.0.60.44",
    host: "0.0.0.0",
    port: 3000,
  },
})

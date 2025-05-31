import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace '/AQI/' with your repo name
export default defineConfig({
  plugins: [react()],
  base: '/https://somya9977.github.io/AQI/',
});

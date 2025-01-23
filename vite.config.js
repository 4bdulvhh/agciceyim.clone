import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Bütün şəbəkələrdən giriş üçün
    port: 5173,       // Port nömrəsi (dəyişdirə bilərsən)
  },
});
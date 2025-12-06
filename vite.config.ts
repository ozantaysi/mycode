import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Ortam değişkenlerini yükle
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: './', // Dosya yollarının sunucu klasör yapısına uyum sağlaması için gerekli
    define: {
      // process.env.API_KEY değişkenini derleme sırasında kodun içine gömer
      // Bu sayede sunucuya attığınızda API anahtarı çalışmaya devam eder.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});
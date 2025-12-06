// Uygulama Ayarları
export const APP_TITLE = 'FaizAsistan-Ver1.0';

// Ortam kontrolü: Localhost mu yoksa sunucu mu?
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// API Endpoint
export const API_ENDPOINT = isLocal 
  ? 'http://localhost/save.php' 
  : './save.php'; 

// Varsayılan Finansal Değerler
export const DEFAULT_ANAPARA = 100000;
export const DEFAULT_FAIZ = 45;
export const DEFAULT_VADE = 32;
export const DEFAULT_STOPAJ = 5;

// Grafik Renkleri
export const COLORS = {
  primary: '#3b82f6', // blue-500
  secondary: '#10b981', // emerald-500
  accent: '#f59e0b', // amber-500
  slate: '#64748b' // slate-500
};
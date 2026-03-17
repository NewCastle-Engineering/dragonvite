export const CONFIG = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost/api',
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'http://localhost',
  ENV: import.meta.env.MODE,
  DEBUG: import.meta.env.DEV,
}

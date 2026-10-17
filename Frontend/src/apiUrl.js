const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()
const currentHost = typeof window === 'undefined' ? 'localhost' : window.location.hostname
const currentProtocol = typeof window === 'undefined' ? 'http:' : window.location.protocol
const isLocalDevelopment = currentHost === 'localhost' || currentHost === '127.0.0.1'
const defaultApiUrl = import.meta.env.DEV || isLocalDevelopment
  ? `${currentProtocol}//${currentHost}:3000`
  : 'https://proyecto-nebula-1.onrender.com'

export const API_URL = (configuredApiUrl || defaultApiUrl).replace(/\/$/, '')

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()
const currentHost = typeof window === 'undefined' ? 'localhost' : window.location.hostname
const currentProtocol = typeof window === 'undefined' ? 'http:' : window.location.protocol
const defaultApiUrl = import.meta.env.PROD ? '' : `${currentProtocol}//${currentHost}:3000`

export const API_URL = (configuredApiUrl || defaultApiUrl).replace(/\/+$/, '')

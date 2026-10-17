const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()
const currentHost = typeof window === 'undefined' ? 'localhost' : window.location.hostname
const currentProtocol = typeof window === 'undefined' ? 'http:' : window.location.protocol

export const API_URL = (configuredApiUrl || `${currentProtocol}//${currentHost}:3000`).replace(/\/$/, '')

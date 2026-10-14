import { API_URL } from './apiUrl.js'

const RESOURCES_URL = `${API_URL}/api/resources`
const ADMIN_RESOURCES_URL = `${API_URL}/api/auth/resources`

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.mensaje || 'No se pudo completar la operación con los recursos.')
  }

  return result
}

export async function getOrientationResources() {
  const result = await request(RESOURCES_URL)
  return result.recursos
}

export async function createOrientationResource(resource) {
  const result = await request(ADMIN_RESOURCES_URL, {
    method: 'POST',
    body: JSON.stringify(resource),
  })
  return result.recurso
}

export async function updateOrientationResource(id, resource) {
  const result = await request(`${ADMIN_RESOURCES_URL}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(resource),
  })
  return result.recurso
}

export function deleteOrientationResource(id) {
  return request(`${ADMIN_RESOURCES_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
